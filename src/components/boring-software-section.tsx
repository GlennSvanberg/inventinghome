import { useTranslation } from 'react-i18next'
import { CogIcon, BarChart3Icon, FileClockIcon } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { ScrollAnimation } from '@/components/scroll-animation'

export function BoringSoftwareSection() {
    const { t } = useTranslation()

    const examples = [
        {
            icon: CogIcon,
            text: t('boring.items.orders'),
        },
        {
            icon: BarChart3Icon,
            text: t('boring.items.logistics'),
        },
        {
            icon: FileClockIcon,
            text: t('boring.items.invoicing'),
        },
    ]

    return (
        <section className="py-24 px-6 relative overflow-hidden bg-background">
            <div className="absolute inset-0 blueprint-grid opacity-10 pointer-events-none" />

            <div className="relative max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <ScrollAnimation direction="fade">
                        <div>
                            <p className="font-mono text-xs tracking-widest text-primary/90 mb-4">
                                {t('boring.kicker')}
                            </p>
                            <h2 className="text-4xl md:text-5xl font-black tracking-tight font-display mb-6">
                                {t('boring.heading')}
                            </h2>
                            <p className="text-xl text-muted-foreground leading-relaxed mb-8">
                                {t('boring.description')}
                            </p>

                            <div className="space-y-4">
                                {examples.map((item, idx) => (
                                    <div key={idx} className="flex items-center gap-3">
                                        <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center border border-primary/20">
                                            <item.icon className="w-5 h-5 text-primary" />
                                        </div>
                                        <span className="text-lg font-medium text-slate-200">{item.text}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </ScrollAnimation>

                    <ScrollAnimation direction="up">
                        <div className="relative">
                            <div className="absolute -inset-4 bg-primary/20 blur-3xl opacity-20 rounded-full" />
                            <Card className="glass-strong border-primary/20 relative">
                                <CardContent className="p-8">
                                    <div className="flex items-center gap-2 mb-6">
                                        <div className="w-3 h-3 rounded-full bg-red-500/50" />
                                        <div className="w-3 h-3 rounded-full bg-amber-500/50" />
                                        <div className="w-3 h-3 rounded-full bg-emerald-500/50" />
                                        <span className="ml-2 font-mono text-[10px] text-muted-foreground">MISSION_CRITICAL_LOGS</span>
                                    </div>
                                    <div className="font-mono text-sm space-y-2 text-slate-400">
                                        <p className="text-primary/80">[14:22:01] Processing order #8842...</p>
                                        <p>[14:22:02] ERP sync completed.</p>
                                        <p>[14:22:02] Inventory levels updated across 4 warehouses.</p>
                                        <p className="text-emerald-400/80">[14:22:03] Status: OK - 100% Reliability</p>
                                        <p className="border-t border-white/5 pt-2 mt-4 text-[10px] uppercase tracking-widest">Next step: Invoicing bridge</p>
                                        <p className="text-slate-500">[14:23:45] Idle: Waiting for next event...</p>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </ScrollAnimation>
                </div>
            </div>
        </section>
    )
}
