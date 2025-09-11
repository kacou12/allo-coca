import type { ColumnDef } from '@tanstack/vue-table'
import collectionAndTransfertBloc from './collectionAndTransfertBloc.vue'

import { h } from 'vue'
import OperatorBloc from './operatorBloc.vue'
import PhoneBloc from './phoneBloc.vue'
import { formatPhoneNumber, formatRelativeDate } from '@/shared/shared'
import type { TransactionResponse } from '@/services/transactions/transaction-type'
import TransactionStatusBloc from './transactionStatusBloc.vue'

export const collectionAndTransferColumn: ColumnDef<TransactionResponse>[] = [
  {
    accessorKey: 'type',
    // minSize: 200,
    // maxSize: 280,
    // size: 200,
    header: () => h('div', { class: 'text-left text-xs ' }, 'type'),

    cell: ({ row }) => {
      const rowOriginal = row.original as TransactionResponse

      return h(
        'div',
        {
          class: 'text-left text-sm font-medium ',
        },
        h(collectionAndTransfertBloc, {
          transactionType: rowOriginal.type,
        }),
      )
    },
  },
  {
    accessorKey: 'date',
    enableResizing: false,
    header: () => h('div', { class: 'text-left text-xs' }, 'Date'),
    cell: ({ row }) => {
      const rowOriginal = row.original as TransactionResponse

      return h(
        'div',
        { class: 'text-left  text-neutral-20 text-sm ' },
        formatRelativeDate(new Date(rowOriginal.created_at)),
      )
    },
  },
  // {
  //   accessorKey: 'id',

  //   header: () => h('div', { class: 'text-left text-xs ' }, 'id'),

  //   cell: ({ row }) => {
  //      const rowOriginal = row.original

  //     return h(
  //       'div',
  //       { class: 'text-left text-sm ' },
  //       h(PhoneBloc, {
  //         phoneNumber: rowOriginal.custom_id,
  //       }),
  //     )
  //   },
  // },

  {
    accessorKey: 'amount',
    // size: 10,
    header: () => h('div', { class: 'text-left  text-xs' }, 'Montant'),
    cell: ({ row }) => {
      const amount = Number.parseFloat(row.getValue('amount'))
      const formatted = new Intl.NumberFormat('fr-FR', {
        style: 'currency',
        currency: 'XOF',
      }).format(amount)

      return h('div', { class: 'text-left  text-neutral-20 text-sm' }, formatted)
    },
  },
  {
    accessorKey: 'fees',
    // size: 10,
    header: () => h('div', { class: 'text-left  text-xs' }, 'Frais'),
    cell: ({ row }) => {
      const rowOriginal = row.original as TransactionResponse
      const amount = rowOriginal.fee.amount
      const formatted = new Intl.NumberFormat('fr-FR', {
        style: 'currency',
        currency: rowOriginal.fee.currency.toUpperCase(),
      }).format(amount)

      return h('div', { class: 'text-left  text-neutral-20 text-sm' }, formatted)
    },
  },
  {
    accessorKey: 'operator',
    // size: 10,
    header: () => h('div', { class: 'text-left  text-xs' }, 'Opérateur'),
    cell: ({ row }) => {
      //   const amount = Number.parseFloat(row.getValue('amount'))
      const rowOriginal = row.original as TransactionResponse

      return h(
        'div',
        { class: 'text-left  text-neutral-20 text-sm' },
        h(OperatorBloc, {
          operator: rowOriginal.provider,
        }),
      )
    },
  },
  {
    accessorKey: 'beneficiaryPhone',
    // size: 10,
    header: () => h('div', { class: 'text-left  text-xs' }, 'Numero'),
    cell: ({ row }) => {
      //   const amount = Number.parseFloat(row.getValue('amount'))
      const rowOriginal = row.original as TransactionResponse

      return h(
        'div',
        { class: 'text-left  text-neutral-20 text-sm' },
        h(PhoneBloc, {
          phoneNumber: rowOriginal.msisdn,
        }),
      )
    },
  },
  {
    accessorKey: 'reference',
    // size: 10,
    // maxSize: 500,
    header: () => h('div', { class: 'text-left  text-xs' }, 'Réference'),
    cell: ({ row }) => {
      //   const amount = Number.parseFloat(row.getValue('amount'))
      const rowOriginal = row.original as TransactionResponse

      return h(
        'div',
        { class: 'text-left  text-neutral-20 text-sm' },
        h(PhoneBloc, {
          phoneNumber: rowOriginal.reference,
        }),
      )
    },
  },

  // {
  //   accessorKey: 'status',
  //   size: 126,
  //   header: () => h('div', { class: 'text-left text-xs ' }, 'status'),
  //   cell: ({ row }) => {
  //     const status = row.getValue('status')

  //     const fullStatus = `

  //     <span class="text-xs text-center font-medium px-2 py-[1px] rounded-2xl bg-success-light-3 text-success-dark">
  //       ${TransactionStatusEnum.SUCCESS.name}</span>

  //     `
  //     return h('div', {
  //       class: ' text-neutral-20 text-xs',
  //       innerHTML: fullStatus,
  //     })
  //   },
  // },
  {
    accessorKey: 'transactionStatus',
    // enableResizing: false,

    header: () => h('div', { class: 'text-left text-xs ' }, 'Statut'),
    cell: ({ row }) => {
      const transactionStatus = row.getValue('transactionStatus')
      const transaction: TransactionResponse = row.original

      // const fullStatus = `

      // <span class="text-xs text-center font-medium px-2 py-[1px] rounded-2xl bg-success-light-3 text-success-dark">
      //   ${TransactionStatusEnum.SUCCESS.name}</span>`
      return h(
        'div',
        {
          class: ' text-neutral-20 text-sm ',
        },
        h(TransactionStatusBloc, {
          transaction: transaction,
        }),
      )
    },
  },
]
