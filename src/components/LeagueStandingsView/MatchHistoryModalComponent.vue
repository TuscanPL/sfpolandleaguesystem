<template>
  <fwb-modal v-if="isOpen" @close="emits('onClose')">
    <template #header>
      <span>{{ currentPlayer?.discordName }}</span>
    </template>
    <template #body>
      <fwb-table>
        <fwb-table-body>
          <fwb-table-row v-for="match in playerMatches" :key="match.id">
            <table-user-cell-component
              :user="getOpposingPlayer(currentPlayer?.discordUserId, match, players)"
            />
            <fwb-table-cell class="font-bold"> {{ getMatchResult(match) }} </fwb-table-cell>
            <fwb-table-cell>
              <fwb-badge :type="getMatchColor(match.matchStatus)">
                {{ getMatchStatusTranslation(match.matchStatus) }}
              </fwb-badge>
            </fwb-table-cell>
          </fwb-table-row>
        </fwb-table-body>
      </fwb-table>
    </template>
  </fwb-modal>
</template>
<script setup lang="ts">
import { computed } from 'vue'
import { MatchStatus, type LeagueMatch } from '@/models/app/matchModel'
import { FwbModal, FwbTable, FwbTableBody, FwbTableRow, FwbTableCell, FwbBadge } from 'flowbite-vue'
import { getPlayerMatchesByLeague, getWinningPlayerId } from '@/common/matchesHelper'
import type { LeagueAssignedUser } from '@/models/app/leagueModel'
import TableUserCellComponent from '@/components/common/TableUserCellComponent.vue'
import { getOpposingPlayer } from '@/common/matchesHelper'
import { getMatchStatusTranslation } from '@/common/utils'
import type { BadgeType } from 'flowbite-vue/components/FwbBadge/types.js'

interface Props {
  isOpen: boolean
  currentPlayer?: LeagueAssignedUser
  leagueId: number
  matches?: LeagueMatch[]
  players: LeagueAssignedUser[]
}

interface Emits {
  (event: 'onClose'): void
}

const props = defineProps<Props>()
const emits = defineEmits<Emits>()

const playerMatches = computed(() => {
  if (!props.matches || !props.currentPlayer) {
    return []
  }

  return getPlayerMatchesByLeague(
    props.leagueId,
    props.currentPlayer?.discordUserId,
    props.matches
  ).sort((a, b) => {
    if (a.matchStatus === MatchStatus.completed) {
      return 1
    }

    if (b.matchStatus === MatchStatus.completed) {
      return -1
    }

    return 0
  })
})

function getMatchColor(matchStatus: MatchStatus): BadgeType | undefined {
  switch (matchStatus) {
    case MatchStatus.completed:
      return 'red'
    case MatchStatus.in_progress:
      return 'green'
    default:
      return undefined
  }
}

function getMatchResult(match: LeagueMatch): string {
  if (match.matchStatus === MatchStatus.in_progress) {
    return 'W trakcie'
  }

  if (match.matchStatus === MatchStatus.upcoming) {
    return 'Nierozegrany'
  }

  if (match.matchStatus === MatchStatus.completed) {
    return props.currentPlayer?.discordUserId === getWinningPlayerId(match)
      ? 'Wygrana'
      : 'Przegrana'
  }

  return ''
}
</script>
