<template>
  <div class="w-20">

    <Field v-slot="{ componentField, errorMessage, }" :name>

      <Input type="number" v-bind="componentField" :default-value="0" :placeholder :min :max
        :class="errorMessage ? ' border-error-light-2 focus:ring-transparent' : ''"
        class="shadow appearance-none   rounded-lg" />


      <!-- </FormItem> -->
    </Field>
  </div>
</template>

<script setup lang="ts">
import { Input } from '@/components/ui/input';
import { Field } from 'vee-validate';
import FadeInAnimation from '../animations/fadeInAnimation.vue';



type InputProps = {
  name: string;
  type?: string;
  placeholder?: string;
  disabled?: boolean;
  max?: number;
  min?: number;
  // size?: 'large' | 'small';
  // extra?: string;
};

withDefaults(defineProps<InputProps>(), {
  type: 'text',
  disabled: false,
  placeholder: '',


  // disabled: false,
  // placeholder: '',
  // size: 'small',
  // extra: '',
});
</script>

<style scoped></style>
