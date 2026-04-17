<script setup lang="ts">
import ClientLayout from '@/layouts/ClientLayout.vue';
import { create, show } from '@/routes/client/support';
import { Head, router } from '@inertiajs/vue3';
import { Button } from '@/components/ui/button';

const props = defineProps<{
    tickets: {
        data: Array<{
            id: number;
            subject: string;
            message: string;
            status: string;
            user?: { id: number; name: string; email: string };
            guest_name?: string;
            guest_email?: string;
            created_at: string;
            updated_at: string;
        }>;
        links: Array<{ url: string | null; label: string; active: boolean }>;
    };
}>();

const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    });
};

function goToTicket(id: number) {
    router.visit(show(id).url);
}

function goToCreateTicket() {
    router.visit(create().url);
}
</script>

<template>
    <Head title="Support" />
    <ClientLayout>
        <main class="flex-1 space-y-6 p-8">
            <div class="flex items-center justify-between gap-4">
                <h1 class="text-2xl font-semibold">Support Tickets</h1>
                <Button @click="goToCreateTicket">New Ticket</Button>
            </div>

            <!-- Tickets Table -->
            <div class="overflow-x-auto rounded-lg bg-white border border-gray-200 shadow">
                <table class="min-w-full divide-y divide-gray-200">
                    <thead class="bg-gray-50">
                        <tr>
                            <th
                                class="px-4 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase"
                            >
                                Ticket #
                            </th>
                            <th
                                class="px-4 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase"
                            >
                                Subject
                            </th>
                            <th
                                class="px-4 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase"
                            >
                                Status
                            </th>
                            <th
                                class="px-4 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase"
                            >
                                Created
                            </th>
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-gray-200 bg-white text-black">
                        <tr
                            v-for="ticket in props.tickets.data"
                            :key="ticket.id"
                            class="cursor-pointer hover:bg-gray-100"
                            @click="goToTicket(ticket.id)"
                        >
                            <td class="px-4 py-3 text-sm text-white">
                                #{{ ticket.id }}
                            </td>
                            <td class="px-4 py-3 text-sm text-white">
                                <div class="font-medium">
                                    {{ ticket.subject }}
                                </div>
                                <div class="line-clamp-1 text-xs text-zinc-200">
                                    {{ ticket.message }}
                                </div>
                            </td>
                            <td class="px-4 py-3">
                                {{ ticket.status }}
                            </td>
                            <td
                                class="px-4 py-3 text-sm whitespace-nowrap text-zinc-200"
                            >
                                {{ formatDate(ticket.created_at) }}
                            </td>
                        </tr>
                        <tr v-if="props.tickets.data.length === 0">
                            <td
                                colspan="6"
                                class="px-4 py-6 text-center text-gray-400"
                            >
                                No tickets found.
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <!-- Pagination -->
            <nav
                v-if="props.tickets.links?.length > 3"
                class="flex justify-center"
            >
                <div class="flex gap-1">
                    <template v-for="(link, i) in props.tickets.links" :key="i">
                        <a
                            v-if="link.url"
                            :href="link.url"
                            class="rounded-md px-3 py-1 text-sm"
                            :class="{
                                'bg-black text-white': link.active,
                                'bg-zinc-950 border border-white/10 text-zinc-200 hover:bg-gray-100 border border-white/5':
                                    !link.active,
                            }"
                            v-html="link.label"
                        ></a>
                        <span
                            v-else
                            class="px-3 py-1 text-zinc-200"
                            v-html="link.label"
                        ></span>
                    </template>
                </div>
            </nav>
        </main>
    </ClientLayout>
</template>
