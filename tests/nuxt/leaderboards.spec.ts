import { renderSuspended } from '@nuxt/test-utils/runtime'
import { screen } from '@testing-library/vue'
import LeaderboardDate from '@/components/leaderboards/pure/date.vue'
import LeaderboardTable from '@/components/leaderboards/pure/table.vue'
import LeaderboardTables from '@/components/leaderboards/pure/tables.vue'

describe('LeaderboardDate', () => {
  it('formats and displays the week start date', async () => {
    await renderSuspended(LeaderboardDate, {
      props: {
        start: new Date(2024, 5, 10),
      },
    })

    expect(screen.getByText('Week of 06/10/2024')).toBeTruthy()
  })
})

describe('LeaderboardTable', () => {
  it('renders ranked users for a counter', async () => {
    await renderSuspended(LeaderboardTable, {
      props: {
        data: {
          title: 'SubhanAllah',
          users: [
            { username: 'alice', count: 25 },
            { username: 'bob', count: 10 },
          ],
        },
      },
    })

    expect(screen.getByText('SubhanAllah')).toBeTruthy()
    expect(screen.getByText('alice')).toBeTruthy()
    expect(screen.getByText('25')).toBeTruthy()
    expect(screen.getByText('bob')).toBeTruthy()

    const rows = document.querySelectorAll('tbody tr')
    expect(rows[1]?.className).toContain('bg-gray-50')
  })
})

describe('LeaderboardTables', () => {
  it('renders a table per competition counter', async () => {
    await renderSuspended(LeaderboardTables, {
      props: {
        data: [
          {
            title: 'SubhanAllah',
            users: [{ username: 'alice', count: 5 }],
          },
          {
            title: 'Alhamdulillah',
            users: [{ username: 'bob', count: 3 }],
          },
        ],
      },
    })

    expect(screen.getByText('SubhanAllah')).toBeTruthy()
    expect(screen.getByText('Alhamdulillah')).toBeTruthy()
    expect(screen.getAllByText('Username')).toHaveLength(2)
  })
})
