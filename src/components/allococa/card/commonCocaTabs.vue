<template>
    <TabsRoot @update:model-value="onchanged" class="flex flex-col w-full" v-model="tabValue">
        <TabsList class="relative shrink-0 flex border-mauve6 w-fit " aria-label="Manage your account">
            <TabsIndicator
                class="absolute px-2 left-0 h-[2px] bottom-0 w-[--radix-tabs-indicator-size] translate-x-[--radix-tabs-indicator-position] rounded-full transition-[width,transform] duration-300">
                <div class="bg-black w-full h-full" />
            </TabsIndicator>

            <TabsTrigger v-for="tab in tabs" :key="tab.value"
                class="bg-white px-5 h-[45px] flex-1 flex items-center justify-center text-[12px] md:text-[15px] leading-none text-[#6D6D6D] select-none  rounded-tl-md  hover:[#000000] data-[state=inactive]:cursor-pointer data-[state=active]:text-[#000000] outline-none cursor-default focus-visible:relative focus-visible:shadow-[0_0_0_2px] focus-visible:shadow-black"
                :value="tab.value">
                <span class="md:text-nowrap">{{ capitalizeFirstLetter(tab.label) }}</span>
            </TabsTrigger>

        </TabsList>

        <!-- <template > -->
        <TabsContent v-for="tab in tabs" :key="tab.value" :value="tab.value"
            class="grow py-5 bg-white rounded-b-md outline-none " :name="tab.value">
            <slot :name="tab.value">
            </slot>
        </TabsContent>

    </TabsRoot>
</template>

<script setup lang="ts">

import { ref } from 'vue'
import { TabsContent, TabsIndicator, TabsList, TabsRoot, TabsTrigger } from 'radix-vue'
import { useRouter } from 'vue-router'
import { AppRoute } from '@/constants/app-route';

const tabValue = defineModel({
    type: String,
    required: true
})

const router = useRouter();


interface Tab {
    value: string
    label: string
    content?: string
}

const props = defineProps<{
    tabs: Tab[]
    defaultTab?: string
}>()

const capitalizeFirstLetter = (str: string) => {
    if (str.length === 0) {
        return ""; // Return an empty string if the input is empty
    }
    return str.charAt(0).toUpperCase() + str.slice(1);
}

const onchanged = (value: string) => {
    if (value != tabValue.value && router.currentRoute.value.name != AppRoute.HOME_REDIRECT.name) {
        router.replace({

            query: {

            }
        })
    }
}


</script>
