<template>
    <div>
        <DefaultButtonComponent text="Edit" type="button" @on-click="onCreateANewUser" />
    </div>

    <transition name="modal" v-if="modalIsVisible">
        <div class="modal-mask">
            <div class="modal-wrapper">
                <div class="modal-dialog modal-lg" role="document">
                    <div class="modal-content">
                        <div class="modal-header border-0">
                            <h5 class="modal-title">Edit user {{ selectedAdminUser?.username }}</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true" @click="closeModal">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <form @submit.prevent="submitForm" autocomplete="off">
                                <!-- Username -->
                                <div class="form-row mb-3">
                                    <div class="col">
                                        <label for="username" class="input-label">Username *</label>
                                        <div class="input-group">
                                            <input id="username" class="form-control" v-model="formData.username"
                                                type="text" placeholder="Username" required />
                                        </div>

                                        <small v-for="error in v$.username.$errors" :key="error.$uid" class="form-text"
                                            style="color: red">
                                            {{ error.$message }}
                                        </small>
                                    </div>
                                </div>
                                <!-- Email -->
                                <div class="form-row mb-3">
                                    <div class="col">
                                        <label for="email" class="input-label">Email *</label>
                                        <div class="input-group">
                                            <input id="email" class="form-control" v-model="formData.email" type="email"
                                                placeholder="Email" required />
                                        </div>

                                        <small v-for="error in v$.email.$errors" :key="error.$uid" class="form-text"
                                            style="color: red">
                                            {{ error.$message }}
                                        </small>
                                    </div>
                                </div>
                                <!-- Rol -->
                                <div class="form-row mb-3">
                                    <div class="col">
                                        <label for="email" class="input-label">Rol *</label>
                                        <div class="input-group">
                                            <select class="custom-select" required v-model="formData.rol"
                                                placeholder="Rol">
                                                <option v-for="(item, index) in roleOptions" :key="index"
                                                    :value="item.value">
                                                    {{ item.label }}
                                                </option>
                                            </select>
                                        </div>

                                        <small v-for="error in v$.rol.$errors" :key="error.$uid" class="form-text"
                                            style="color: red">
                                            {{ error.$message }}
                                        </small>
                                    </div>
                                </div>


                                <!-- Mindbody staff -->
                                <div class="form-row mb-3">
                                    <div class="col">
                                        <label for="linkedInstructorIds" class="input-label">Mindbody staff</label>
                                        <div>
                                            <multiselect v-model="selectedInstructors" :options="instructors"
                                                :multiple="true" :close-on-select="false" :clear-on-select="false"
                                                :preserve-search="true" placeholder="Mindbody staff" label="name"
                                                track-by="id" :preselect-first="true" class="custom-multiselect"
                                                :loading="loadingInstructors">
                                            </multiselect>
                                        </div>

                                        <small v-for="error in v$.linkedInstructorIds.$errors" :key="error.$uid"
                                            class="form-text" style="color: red">
                                            {{ error.$message }}
                                        </small>
                                    </div>
                                </div>

                                <!-- Admin sites -->
                                <div class="form-row mb-3">
                                    <div class="col">
                                        <label class="input-label">Admin sites *</label>
                                        <div>

                                            <div>
                                                <multiselect v-model="selectedSites" :options="availableSites"
                                                    :multiple="true" :close-on-select="false" :clear-on-select="false"
                                                    :preserve-search="true" placeholder="Admin sites" label="name"
                                                    track-by="code" :preselect-first="false" class="custom-multiselect"
                                                    :loading="loadingSites" :searchable="false">
                                                </multiselect>
                                            </div>

                                            <small v-for="error in v$.linkedSiteCodes.$errors" :key="error.$uid"
                                                class="form-text" style="color: red">
                                                {{ error.$message }}
                                            </small>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                        <div class="modal-footer border-0">
                            <DefaultButtonComponent text="Cancel" type="button" :disabled="isSaving" variant="secondary"
                                @on-click="closeModal"></DefaultButtonComponent>

                            <DefaultButtonComponent text="Update" type="button" :is-loading="isSaving"
                                @on-click="submitForm"></DefaultButtonComponent>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </transition>
</template>

<script setup lang="ts">
import DefaultButtonComponent from '@/modules/shared/components/DefaultButtonComponent.vue'
import type { ApiService } from '@/services/apiService';
import { inject } from 'vue';
import { useAdminUser } from '../composables/userAdminUser';

import Multiselect from 'vue-multiselect';
import 'vue-multiselect/dist/vue-multiselect.min.css';
import { AdminUser } from '../interfaces';

const {
    openModal, modalIsVisible, closeModal, v$, isSaving,
    submitForm, formData, roleOptions, availableSites, instructors,
    loadingInstructors, loadingSites, selectedAdminUser,
    selectedInstructors, selectedSites } = useAdminUser(
        inject<ApiService>('gqlApiService')!
    )

const props = defineProps<{
    adminUser: AdminUser
}>()

function onCreateANewUser() {
    openModal(props.adminUser)
}
</script>
<style scoped></style>

<style>
.custom-multiselect .multiselect__tag {
    background-color: #ff7f61;
}

.custom-multiselect .multiselect__tag-icon {
    color: #fff;
}

.custom-multiselect .multiselect__option--highlight {
    background-color: #ff7f61;
    color: #fff;
}

.custom-multiselect .multiselect__option--highlight::after {
    background-color: #ff7f61;
}

.custom-multiselect .multiselect__spinner {
    border-top-color: #ff7f61;
}

.multiselect__spinner::after,
.multiselect__spinner::before {
    border-color: #ff7f61 transparent transparent;
}
</style>
