import nextVitals from 'eslint-config-next/core-web-vitals'
import nextTs from 'eslint-config-next/typescript'
import boundaries from 'eslint-plugin-boundaries'
import storybook from 'eslint-plugin-storybook'
import { defineConfig, globalIgnores } from 'eslint/config'

const eslintConfig = defineConfig([
    ...nextVitals,
    ...nextTs,
    globalIgnores(['.next/**', 'out/**', 'build/**', 'next-env.d.ts']),
    {
        plugins: { boundaries },
        rules: {
            'boundaries/dependencies': [
                'error',
                {
                    default: 'disallow',
                    policies: [
                        {
                            from: { element: { types: ['shared'] } },
                            allow: {
                                to: { element: { types: ['shared'] } },
                            },
                        },
                        {
                            from: { element: { types: ['entities'] } },
                            allow: {
                                to: {
                                    element: {
                                        types: ['shared', 'entities'],
                                    },
                                },
                            },
                        },
                        {
                            from: { element: { types: ['features'] } },
                            allow: {
                                to: {
                                    element: {
                                        types: [
                                            'shared',
                                            'entities',
                                            'features',
                                        ],
                                    },
                                },
                            },
                        },
                        {
                            from: { element: { types: ['widgets'] } },
                            allow: {
                                to: {
                                    element: {
                                        types: [
                                            'shared',
                                            'entities',
                                            'features',
                                            'widgets',
                                        ],
                                    },
                                },
                            },
                        },
                        {
                            from: { element: { types: ['processes'] } },
                            allow: {
                                to: {
                                    element: {
                                        types: [
                                            'shared',
                                            'entities',
                                            'features',
                                            'widgets',
                                            'processes',
                                        ],
                                    },
                                },
                            },
                        },
                        {
                            from: { element: { types: ['app'] } },
                            allow: {
                                to: {
                                    element: {
                                        types: [
                                            'shared',
                                            'entities',
                                            'features',
                                            'widgets',
                                            'processes',
                                            'app',
                                        ],
                                    },
                                },
                            },
                        },
                    ],
                },
            ],
        },
        settings: {
            'boundaries/elements': [
                { type: 'features', pattern: 'src/features/*' },
                { type: 'widgets', pattern: 'src/widgets/*' },
                { type: 'app', pattern: 'src/app/*' },
                { type: 'entities', pattern: 'src/entities/*' },
                { type: 'shared', pattern: 'src/shared/*' },
                { type: 'processes', pattern: 'src/processes/*' },
            ],
        },
    },
    {
        // Осознанное исключение: store — единственная точка приложения,
        // которая обязана собирать reducer'ы всех entities/features.
        // См. обсуждение архитектуры в README / ADR.
        files: ['src/app/store/store.ts'],
        plugins: { boundaries },
        rules: {
            'boundaries/dependencies': [
                'error',
                {
                    default: 'disallow',
                    policies: [
                        {
                            from: { element: { types: ['app'] } },
                            allow: {
                                to: {
                                    element: {
                                        types: [
                                            'shared',
                                            'entities',
                                            'features',
                                            'widgets',
                                            'processes',
                                            'app',
                                        ],
                                    },
                                },
                            },
                        },
                    ],
                },
            ],
        },
    },
    {
        // Осознанное исключение: typed hooks обязаны знать RootState/AppDispatch
        // из app/store — иначе их придётся типизировать вручную в каждом компоненте.
        files: ['src/shared/lib/hooks/redux-hooks.ts'],
        plugins: { boundaries },
        rules: {
            'boundaries/dependencies': [
                'error',
                {
                    default: 'disallow',
                    policies: [
                        {
                            from: { element: { types: ['shared'] } },
                            allow: {
                                to: {
                                    element: { types: ['shared', 'app'] },
                                },
                            },
                        },
                    ],
                },
            ],
        },
    },
    ...storybook.configs['flat/recommended'],
])

export default eslintConfig
