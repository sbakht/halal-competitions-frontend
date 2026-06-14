import { defineConfig } from 'vitest/config'
import { defineVitestProject } from '@nuxt/test-utils/config'
import { fileURLToPath } from 'node:url'

export default defineConfig({
  test: {
    coverage: {
      provider: 'v8',
      reporter: ['text', 'text-summary', 'html', 'lcov'],
      reportsDirectory: './coverage',
      include: [
        'composables/**/*.{ts,js,vue}',
        'components/**/*.{ts,js,vue}',
        'middleware/**/*.{ts,js}',
        'stores/**/*.{ts,js}',
        'service/**/*.{ts,js}',
        'utils/**/*.{ts,js}',
        'data.ts',
        'utils.ts',
      ],
      exclude: [
        'tests/**',
        '**/*.spec.{ts,js}',
        '**/*.d.ts',
        'types/**',
        '.nuxt/**',
        'node_modules/**',
      ],
      thresholds: {
        statements: 80,
        branches: 80,
        functions: 80,
        lines: 80,
      },
    },
    projects: [
      {
        resolve: {
          alias: {
            '@': fileURLToPath(new URL('./', import.meta.url)),
            '~': fileURLToPath(new URL('./', import.meta.url)),
          },
        },
        test: {
          name: 'unit',
          include: ['tests/unit/**/*.spec.ts'],
          environment: 'jsdom',
          globals: true,
        },
      },
      await defineVitestProject({
        test: {
          name: 'nuxt',
          include: ['tests/nuxt/**/*.spec.ts'],
          environment: 'nuxt',
          globals: true,
          environmentOptions: {
            nuxt: {
              domEnvironment: 'jsdom',
            },
          },
        },
      }),
    ],
  },
})
