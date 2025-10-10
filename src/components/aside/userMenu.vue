<template>
    <DropdownMenu>
        <DropdownMenuTrigger as-child>
            <!-- <Button variant="outline">
                Open
            </Button> -->
            <section :class="[isScrolledOrHomePage ? 'bg-primary-50' : 'bg-transparent']"
                class="rounded-full border-[1px] p-[4px] cursor-pointer">

                <User2Icon :class="[isScrolledOrHomePage ? 'text-white' : 'text-white']" :stroke-width="1" :size="28">
                </User2Icon>
            </section>
        </DropdownMenuTrigger>
        <DropdownMenuContent v-if="isAuth" class="w-56">

            <DropdownMenuItem>
                <span>Mon compte</span>
                <!-- <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut> -->
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem class="cursor-pointer" @click="handleLogout">
                <span>Déconnexion</span>
                <!-- <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut> -->
            </DropdownMenuItem>
        </DropdownMenuContent>
        <DropdownMenuContent v-else class="w-56">

            <DropdownMenuItem class="cursor-pointer" @click="$router.push({ name: AppRoute.LOGIN.name })">
                <span>Connexion</span>
                <!-- <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut> -->
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem class="cursor-pointer" @click="$router.push({ name: AppRoute.REGISTER.name })">
                <span>Inscription</span>
                <!-- <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut> -->
            </DropdownMenuItem>
        </DropdownMenuContent>
    </DropdownMenu>
</template>

<script setup lang="ts">
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { AppRoute } from "@/constants/app-route";
import { destroySensitiveInfo } from "@/services/auth/auth-util";
import { useAuthStore } from "@/stores/useAuthStore";
import { useLoaderStore } from "@/stores/useLoaderStore";
import { User2Icon } from "lucide-vue-next";
import { storeToRefs } from "pinia";

defineProps({
    isScrolledOrHomePage: {
        type: Boolean,
        required: true
    }
})

const { startLoading, stopLoading } = useLoaderStore();

const { isAuth } = storeToRefs(useAuthStore());

const { logout } = useAuthStore();

const handleLogout = () => {
    startLoading();
    logout();
    destroySensitiveInfo();

    setTimeout(() => { stopLoading() }, 1000);
}


</script>
