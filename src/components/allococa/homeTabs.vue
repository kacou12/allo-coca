<template>

    <!-- <Tabs v-model="currentProvider" :default-value="providers![0].id" class="w-full "> -->
    <Tabs v-model="provider" class="w-full ">
        <TabsList class="w-full  rounded-xl">
            <!-- <TabsTrigger v-for="provider in providers" :key="provider.id" class="w-full" :value="provider.id">
                {{ provider.name }}
            </TabsTrigger> -->
            <!-- <TabsTrigger class="w-[25%]" value="orange">
                Orange
            </TabsTrigger>
            <TabsTrigger class="w-[25%]" value="MTN">
                MTN
            </TabsTrigger>
            <TabsTrigger class="w-[25%]" value="Wave">
                Wave
            </TabsTrigger> -->
            <TabsTrigger value="gas">
                Boisson gazeuse
            </TabsTrigger>
            <TabsTrigger value="water">
                Eaux minerales
            </TabsTrigger>
        </TabsList>
        <TabsContent value="gas">
            <div class="grid grid-cols-4 gap-4">
                <BeverageCard></BeverageCard>
                <BeverageCard></BeverageCard>
                <BeverageCard></BeverageCard>
                <BeverageCard></BeverageCard>
            </div>
        </TabsContent>
        <TabsContent value="water">
            <WaterCard></WaterCard>
            <WaterCard></WaterCard>
            <WaterCard></WaterCard>
            <WaterCard></WaterCard>
        </TabsContent>
    </Tabs>
</template>

<script setup lang="ts">
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import type { ProviderResponse } from '@/services/providers/provider-type';
import { computed, nextTick, ref, type PropType } from 'vue';
import BeverageCard from './card/beverageCard.vue';
import WaterCard from './card/waterCard.vue';

const provider = defineModel({ type: String });



</script>