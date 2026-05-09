interface FeatureCardProps {
  number: number
  title: string
  description: string
  variant: 'blue' | 'pink' | 'mix'
  fullWidth?: boolean
}

export function FeatureCard({ number, title, description, variant, fullWidth }: FeatureCardProps) {
  return (
    <div className={`feature-card ${variant}${fullWidth ? ' full-width' : ''}`} style={fullWidth ? { gridColumn: '1 / -1' } : {}}>
      <div className="feature-num">{String(number).padStart(2, '0')}</div>
      <div className="feature-title">{title}</div>
      <p className="feature-desc">{description}</p>
    </div>
  )
}

interface FeaturesGridProps {
  features: FeatureCardProps[]
}

export default function FeaturesGrid({ features }: FeaturesGridProps) {
  return (
    <div className="features-grid">
      {features.map((feature, i) => (
        <FeatureCard key={i} {...feature} />
      ))}
    </div>
  )
}
