<template>
  <div>
    <v-card-title class="headline">Gestión de Roles de Usuarios</v-card-title>
    <v-card-subtitle class="subtitle-1">
      Administra los roles de usuarios (Admin, Profesor, Alumno).
    </v-card-subtitle>

    <v-row class="px-4 py-2">
      <v-col cols="12" sm="6" md="4">
        <v-select
          v-model="filtroRol"
          :items="['Todos', 'Administrador', 'Profesor', 'Alumno']"
          label="Filtrar por rol"
          dense
          outlined
        ></v-select>
      </v-col>
      <v-col cols="12" sm="6" md="4">
        <v-text-field
          v-model="busqueda"
          label="Buscar por nombre"
          dense
          outlined
          append-icon="mdi-magnify"
        ></v-text-field>
      </v-col>
    </v-row>

    <!-- Indicador de carga -->
    <v-progress-circular v-if="cargando" indeterminate color="primary"></v-progress-circular>

    <v-data-table
      v-if="isAdmin && usuarios.length > 0"
      :headers="headers"
      :items="usuariosFiltrados"
      :search="busqueda"
      :loading="cargando"
      :sort-by="[{ key: 'username', order: 'asc' }]"
      class="elevation-1"
    >
      <template v-slot:top>
        <v-dialog v-model="dialog" max-width="500px">
          <v-card>
            <v-card-title>
              <span class="text-h5">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.username" label="Nombre de usuario"></v-text-field>
                  </v-col>

                  <v-col cols="12" sm="6" md="4">
                    <!-- Selector para cambiar el rol -->
                    <v-select
                      v-model.number="editedItem.permission_type_id"
                      :items="rolesDisponibles"
                      item-text="text"
                      item-value="value"
                      label="Rol"
                    ></v-select>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue-darken-1" variant="text" @click="close">Cancelar</v-btn>
              <v-btn color="blue-darken-1" variant="text" @click="save">Guardar</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>

        <!-- Diálogo para eliminar usuario -->
        <v-dialog v-model="dialogDelete" max-width="500px">
          <v-card>
            <v-card-title class='text-h5'>¿Estás seguro de que quieres eliminar este usuario?</v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color='blue-darken-1' variant='text' @click='closeDelete'>Cancelar</v-btn>
              <v-btn color='blue-darken-1' variant='text' @click='deleteItemConfirm'>OK</v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </template>

      <!-- Acciones por cada usuario -->
      <template v-slot:item.actions="{ item }">
        <!-- Selector para cambiar el rol -->
        <v-select 
          v-if="item.raw" 
          v-model.number="item.raw.permission_type_id" 
          :items="rolesDisponibles"
          item-text="text"
          item-value="value"
          @change='cambiarPermiso(item.raw.id, item.raw.permission_type_id)'
          style="margin-right: 8px;"
        ></v-select> 

        <!-- Iconos para editar y eliminar -->
        <i @click='editItem(item.raw)' class='mdi mdi-pencil' style="cursor: pointer; margin-right: 8px;"></i> 
        <i @click='deleteItem(item.raw)' class='mdi mdi-delete' style="cursor: pointer;"></i> 
      </template>

      <!-- Mensaje cuando no hay datos -->
      <template v-slot:no-data>
        No hay usuarios disponibles.
        <!-- Botón para reiniciar -->
        <button @click='initialize'>Reiniciar</button> 
      </template> 
    </v-data-table>


    <!-- Alertas -->
    <div v-if='!isAdmin'>
      No tienes permisos para gestionar roles de usuarios.
    </div>

    <!-- Mensaje de error -->
    <div v-if='errorMessage'>{{ errorMessage }}</div>

    <!-- Botón para volver al inicio -->
    <div class='my-4'>
      Volver al inicio
    </div> 
  </div> <!-- Fin del único elemento raíz -->
</template>

<script>
// Importaciones necesarias
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useAppStore } from '@/stores/app';
import { storeToRefs } from 'pinia';
import communicationManager from '@/services/communicationManager';

export default {
  setup() {
    const pinia = useAppStore();
    const { user } = storeToRefs(pinia);
    const router = useRouter();

    // Definición de variables reactivas
    const dialog = ref(false);
    const dialogDelete = ref(false);
    const filtroRol = ref('Todos');
    const busqueda = ref('');
    const cargando = ref(false);
    const usuarios = ref([]);
    const errorMessage = ref('');
    
    const headers = ref([
      { title: 'Nombre', key: 'username' },
      { title: 'Email', key: 'email' },
      { title: 'Rol', key: 'permission' },
      { title: 'Acciones', key: 'actions', sortable: false },
    ]);

   const editedIndex = ref(-1);
   const editedItem = ref({
     username: '',
     email: '',
     permission_type_id: null,
   });
   
   const defaultItem = {
     username: '',
     email: '',
     permission_type_id: null,
   };

   // Mapeo de permisos
   const permissionMap = {
     1: { text: 'Administrador', value: 1 },
     2: { text: 'Profesor', value: 2 },
     3: { text: 'Alumno', value: 3 },
   };

   // Computed properties
   const isAdmin = computed(() => pinia.user?.permission === 'admin');
   
   const rolesDisponibles = Object.values(permissionMap); // Usar el mapeo

   // Filtrar usuarios según rol y búsqueda
   const usuariosFiltrados = computed(() => {
     if (!usuarios.value || usuarios.value.length === 0) {
       return []; // Retorna un array vacío si no hay usuarios
     }

     let filtrados = usuarios.value;

     if (filtroRol.value !== 'Todos') {
       const rolValue = rolesDisponibles.find(r => r.text === filtroRol.value)?.value;
       filtrados = filtrados.filter((usuario) => permissionMap[usuario.permission_type_id]?.value === rolValue);
     }

     if (busqueda.value) {
       filtrados = filtrados.filter((usuario) =>
         usuario.username.toLowerCase().includes(busqueda.value.toLowerCase())
       );
     }

     return filtrados;
   });

   // Título del formulario
   const formTitle = computed(() => {
     return editedIndex.value === -1 ? 'Nuevo Usuario' : 'Editar Usuario';
   });

   // Inicializar usuarios
   const initialize = async () => {
     cargando.value = true;
     try {
       const response = await communicationManager.getUser();
       
       if (!response.ok) {
         throw new Error('Error al cargar usuarios');
       }
       
       const data = await response.json();
       
       // Verifica la estructura del data aquí
       console.log('Datos recibidos:', data);
       
       if (Array.isArray(data)) {
         // Mapear permission_type_id a la estructura esperada
         data.forEach(usuario => {
           usuario.permission_type_id = usuario.permission_type_id; // Mantener el ID original
           usuario.permission = permissionMap[usuario.permission_type_id]?.text || ''; // Asignar el texto correspondiente
         });
         usuarios.value = data; // Asignar datos a la variable reactiva
       } else {
         console.error('Los datos no tienen el formato esperado:', data);
         errorMessage.value = 'Formato inesperado';
       }
       
     } catch (error) {
       console.error('Error al obtener los usuarios:', error.message);
       errorMessage.value = error.message;
       
     } finally {
       cargando.value = false;
     }
   };

   // Editar usuario
   const editItem = (item) => {
     editedIndex.value = usuarios.value.indexOf(item);
     editedItem.value = Object.assign({}, item);
     dialog.value = true;
   };

   // Eliminar usuario
   const deleteItem = (item) => {
     editedIndex.value = usuarios.value.indexOf(item);
     editedItem.value = Object.assign({}, item);
     dialogDelete.value = true;
   };

   // Confirmar eliminación del usuario
   const deleteItemConfirm = () => {
     if (editedIndex.value > -1) {
       usuarios.value.splice(editedIndex.value, 1);
     }
     closeDelete();
   };

   // Cambiar permiso del usuario
   async function cambiarPermiso(userId, nuevoRol) {
     try {
       const permissionTypeId = Number(nuevoRol); // Asegúrate de que sea un número

       const response = await communicationManager.modifyPermission(userId, permissionTypeId);
       if (response.ok) {
         console.log("Permiso modificado con éxito");
         // Actualizar el permiso localmente también
         const userIndex = usuarios.value.findIndex(u => u.id === userId);
         if (userIndex !== -1) {
           usuarios.value[userIndex].permission_type_id = permissionTypeId; // Actualiza el ID del permiso localmente
           usuarios.value[userIndex].permission =
             permissionMap[permissionTypeId]?.text || ""; // Actualiza el texto del permiso localmente
         }
       } else {
         console.error("Error al modificar el permiso");
         errorMessage.value = "Error al modificar el permiso";
       }
     } catch (error) {
       console.error("Error en la petición:", error);
       errorMessage.value =
         "Error en la petición: " + error.message;
     }
   }

   // Cerrar diálogo de edición
   const close = () => {
     dialog.value = false;
     editedIndex.value = -1;
     editedItem.value = Object.assign({}, defaultItem);
   };

   // Cerrar diálogo de eliminación
   const closeDelete = () => {
     dialogDelete.value = false;
     editedIndex.value = -1;
     editedItem.value = Object.assign({}, defaultItem);
   };

   // Guardar cambios en el usuario editado o agregar uno nuevo
   const save = () => {
     if (editedIndex.value > -1) {
       Object.assign(usuarios.value[editedIndex.value], editedItem.value);
     } else {
       usuarios.value.push(editedItem.value);
     }
     close();
   };

   // Volver a la página principal
   const volverAtras = () => {
     router.push("/main");
   };

   // Montar el componente y cargar usuarios si es admin
   onMounted(() => {
     console.log("Componente montado");
     initialize();
   });

   return {
     dialog,
     dialogDelete,
     headers,
     usuarios,
     editedIndex,
     editedItem,
     defaultItem,
     formTitle,
     filtroRol,
     busqueda,
     cargando,
     errorMessage,
     isAdmin,
     rolesDisponibles,
     usuariosFiltrados,
     editItem,
     deleteItem,
     deleteItemConfirm,
     cambiarPermiso,
     close,
     closeDelete,
     save,
     volverAtras,
   };
  },
};
</script>

<style scoped>
/* Aquí puedes agregar estilos específicos para este componente */
</style>
