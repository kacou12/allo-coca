<template>
    <TabsRoot class="flex flex-col w-full" :default-value="`tab${tabs[0].value}`">
        <TabsList class="relative shrink-0 flex border-mauve6 w-[380px] " aria-label="Manage your account">
            <TabsIndicator
                class="absolute px-2 left-0 h-[2px] bottom-0 w-[--radix-tabs-indicator-size] translate-x-[--radix-tabs-indicator-position] rounded-full transition-[width,transform] duration-300">
                <div class="bg-black w-full h-full" />
            </TabsIndicator>

            <TabsTrigger v-for="tab in tabs" :key="tab.value"
                class="bg-white px-5 h-[45px] flex-1 flex items-center justify-center text-[15px] leading-none text-[#6D6D6D] select-none  rounded-tl-md  hover:[#000000] data-[state=inactive]:cursor-pointer data-[state=active]:text-[#000000] outline-none cursor-default focus-visible:relative focus-visible:shadow-[0_0_0_2px] focus-visible:shadow-black"
                :value="`tab${tab.value}`">
                {{ tab.label }}
            </TabsTrigger>
            <!-- <TabsTrigger
                class="bg-white px-5 h-[45px] flex-1 flex items-center justify-center text-[15px] leading-none text-[#6D6D6D] select-none  rounded-tl-md  hover:[#000000] data-[state=inactive]:cursor-pointer data-[state=active]:text-[#000000] outline-none cursor-default focus-visible:relative focus-visible:shadow-[0_0_0_2px] focus-visible:shadow-black"
                value="tab1">
                Boissons gazeuse
            </TabsTrigger>
            <TabsTrigger
                class="bg-white px-5 h-[45px] flex-1 flex items-center justify-center text-[15px] leading-none text-[#6D6D6D] select-none  rounded-tr-md hover:[#000000] data-[state=inactive]:cursor-pointer data-[state]:text-[#000000] outline-none cursor-default focus-visible:relative focus-visible:shadow-[0_0_0_2px] focus-visible:shadow-black"
                value="tab2">
                Eaux minérales
            </TabsTrigger> -->
        </TabsList>

        <!-- <template > -->
        <TabsContent v-for="tab in tabs" :key="tab.value" :value="`tab${tab.value}`"
            class="grow py-5 bg-white rounded-b-md outline-none focus:shadow-[0_0_0_2px] focus:shadow-black"
            :name="tab.value">
            <slot :name="tab.value">
            </slot>
        </TabsContent>
        <!-- </template> -->
        <!-- <TabsContent class="grow py-5 bg-white rounded-b-md outline-none focus:shadow-[0_0_0_2px] focus:shadow-black"
            value="tab1">
            <div class="grid grid-cols-4 gap-4">
                <BeverageCard></BeverageCard>
                <BeverageCard></BeverageCard>
                <BeverageCard></BeverageCard>
                <BeverageCard></BeverageCard>
            </div>
        </TabsContent>
        <TabsContent class="grow py-5 bg-white rounded-b-md outline-none focus:shadow-[0_0_0_2px] focus:shadow-black"
            value="tab2">
            <div class="grid grid-cols-4 gap-4">

                <WaterCard></WaterCard>
                <WaterCard></WaterCard>
                <WaterCard></WaterCard>
                <WaterCard></WaterCard>
            </div>
        </TabsContent> -->
    </TabsRoot>
</template>

<!-- AnimatedTabs.vue -->
<script setup lang="ts">

import { ref } from 'vue'
import { TabsContent, TabsIndicator, TabsList, TabsRoot, TabsTrigger } from 'radix-vue'


interface Tab {
    value: string
    label: string
    content?: string
}

const props = defineProps<{
    tabs: Tab[]
    defaultTab?: string
}>()

// const currentTab = ref(props.defaultTab || props.tabs[0].value)

// const handleTabChange = (value: string) => {
//     currentTab.value = value
// }
</script>
