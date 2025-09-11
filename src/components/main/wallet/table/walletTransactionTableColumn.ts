import type { ColumnDef } from '@tanstack/vue-table'

import { MerchantRequestStatusEnum, type MerchantRequestTypeEnum } from '@/constants/constant.enum'
import type { MerchantRequestResponse } from '@/services/merchant-request/merchant-request.type'
import { h } from 'vue'
import WalletTypeBloc from '../walletTypeBloc.vue'
import { formatRelativeDate } from '@/shared/shared'
import WalletTransactionDetails from '../walletTransactionDetails.vue'

export const walletTransactionsColumn: ColumnDef<MerchantRequestResponse>[] = [
  {
    accessorKey: 'type',
    // size: 300,
    
    // maxSize: 100,
    // size: 440,
    header: () => h('div', { class: 'text-left text-xs ' }, 'Type'),

    cell: ({ row }) => {
      const rowOriginal = row.original as MerchantRequestResponse

      return h(
        'div',
        {
          class: 'text-left text-sm font-medium ',
        },
        h(WalletTypeBloc, {
          merchantRequestType: rowOriginal.type as MerchantRequestTypeEnum,
        }),
      )
    },
  },
  {
    accessorKey: 'date',
    // size: 100,
    // maxSize: 100,
    // size: 440,
    header: () => h('div', { class: 'text-left text-xs ' }, 'Date'),

    cell: ({ row }) => {
      const rowOriginal = row.original as MerchantRequestResponse

      return h(
        'div',
        {
          class: 'text-left text-sm font-medium ',
        },
        formatRelativeDate(new Date(rowOriginal.created_at)),
        
      )
    },
  },
  {
    accessorKey: 'amount',
    // size: 10,
    header: () => h('div', { class: 'text-left  text-xs' }, 'Montant'),
    cell: ({ row }) => {
      const rowOriginal = row.original as MerchantRequestResponse
      const formatted = new Intl.NumberFormat('fr-FR', {
        style: 'currency',
        currency: 'XOF',
      }).format(rowOriginal.amount)

      return h('div', { class: 'text-left  text-neutral-20 text-sm' }, formatted)
    },
  },
  {
    accessorKey: 'status',
    // size: 126,
    header: () => h('div', { class: 'text-left text-xs text-center' }, 'statut'),
    cell: ({ row }) => {
      const status = row.original.status as MerchantRequestStatusEnum
      let statusBadgeHtml = ''

      // Logique pour afficher le badge en fonction du statut
      switch (status) {
        case MerchantRequestStatusEnum.Approved:
          statusBadgeHtml = `<span class="text-xs text-center w-fit font-medium px-2 py-1 rounded-2xl bg-success-light-3 text-success-dark">Succès</span>`
          break
        case MerchantRequestStatusEnum.Pending:
          statusBadgeHtml = `<span class="text-xs text-center w-fit font-medium px-2 py-1 rounded-2xl bg-warning-dark text-warning-light-2">En attente</span>`
          break
        case MerchantRequestStatusEnum.Rejected:
          statusBadgeHtml = `<span class="text-xs text-center w-fit font-medium px-2 py-1 rounded-2xl bg-[#FFCDD2] text-[#D32F2F]">Échoué</span>`
          break
        default:
          statusBadgeHtml = `<span class="text-xs text-center w-fit font-medium px-2 py-1 rounded-2xl bg-gray-200 text-gray-800">${status}</span>`
          break
      }

      return h('div', {
        class: ' text-neutral-20 text-xs w-full flex justify-center items-center ',
        innerHTML: statusBadgeHtml,
      })
    },
  },
  {
    accessorKey: 'actions',
    id: 'actions',
    enableHiding: false,
    size: 116,
    cell: ({ row }) => {
     const rowOriginal = row.original as MerchantRequestResponse

      return h(
        'div',
        { class: 'text-right flex justify-center' },
        h(WalletTransactionDetails, {
          request: rowOriginal,
        }),
      )
    },
  },

]
