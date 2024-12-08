<template>
    <div>

        <h2 class="mb-5 text-xl text-center">Initial Work Section</h2>

        <div class="flex gap-5">
            <DropDown
                v-model="selectedProject"
                :id="'projectDropdown'"
                :label="'Project:'"
                :options="props.projectDropDownList"
                @update:changed="() => emits('update:changedProject')"
            />

            <DropDown
                v-model="selectedCompany"
                :id="'companyDropdown'"
                :label="'company:'"
                :options="props.companyDropDownList"
                @update:changed="() => emits('update:changedCompany')"
            />

            <CustomInput
                v-model="workSectionDescription"
                :id="'workSectionDescription'"
                :label="'Description:'"
                :title="'A short description of the work being done.'"
                :rows="2"
                :type="'textarea'"
                @update:changed="emits('update:changedDescription')"
            />
        </div>

    </div>
</template>

<script setup>
    import DropDown from './elements/DropDown.vue';
    import CustomInput from './elements/CustomInput.vue';

    const selectedProject = defineModel('selectedProject')
    const workSectionDescription = defineModel('workSectionDescription')
    const selectedCompany = defineModel('selectedCompany')

    const emits = defineEmits(['update:changedProject', 'update:changedDescription',
        'update:changedCompany'])

    const props = defineProps({
        projectDropDownList: {type: Array, default: []},       
        companyDropDownList: {type: Array, default: []},
    })


</script>
