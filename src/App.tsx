import { useMemo, useState, type FormEvent } from 'react'
import {
  normalizePhoneNumber,
  detectOperator,
  isCambodianPhoneNumber,
  formatLocal,
  formatInternational,
} from './services/phoneChecker'

const EXAMPLES = [
  { number: '010123456', label: '010' },
  { number: '012123456', label: '012' },
  { number: '015123456', label: '015' },
  { number: '097123456', label: '097' },
  { number: '0881234567', label: '088' },
  { number: '071123456', label: '071' },
]

function App() {
  const [value, setValue] = useState('')
  const [checked, setChecked] = useState(false)
  const [copied, setCopied] = useState<'local' | 'international' | null>(null)

  const normalized = useMemo(
    () => normalizePhoneNumber(value),
    [value],
  )

  const operator = useMemo(
    () => detectOperator(value),
    [value],
  )

  const valid = useMemo(
    () => isCambodianPhoneNumber(value),
    [value],
  )

  const isPrefixOnly = /^0\d{2}$/.test(normalized)

  const hasInput = normalized.length > 0

  const isDetected = operator !== null

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setChecked(true)
  }

  function handleInputChange(newValue: string) {
    setValue(newValue)
    setChecked(false)
    setCopied(null)
  }

  function clearInput() {
    setValue('')
    setChecked(false)
    setCopied(null)
  }

  function useExample(number: string) {
    setValue(number)
    setChecked(true)
    setCopied(null)
  }

  async function copyNumber(
    number: string,
    type: 'local' | 'international',
  ) {
    if (!number) return

    try {
      await navigator.clipboard.writeText(number)

      setCopied(type)

      window.setTimeout(() => {
        setCopied(null)
      }, 1800)
    } catch {
      // Clipboard may be unavailable in some browsers/contexts.
    }
  }

  return (
    <main className="app-shell">
      {/* Ambient background */}
      <div className="background-effects" aria-hidden="true">
        <div className="glow glow-cyan" />
        <div className="glow glow-purple" />
        <div className="glow glow-blue" />
        <div className="grid-background" />
      </div>

      <div className="page-container">

        {/* ================= HEADER ================= */}
        <header className="hero">
          <div className="status-pill">
            <span className="status-dot" />
            <span>Cambodian Mobile Prefix Database</span>
          </div>

          <h1 className="hero-title">
            Khmer
            <span> Number</span>
          </h1>

          <p className="hero-description">
            Instantly identify Cambodian phone number prefixes
            and discover their assigned mobile operator.
          </p>
        </header>

        {/* ================= MAIN CARD ================= */}
        <section className="main-card">

          <div className="card-top-line" />

          {/* INPUT */}
          <form onSubmit={handleSubmit}>
            <div className="input-header">
              <label htmlFor="phone-number">
                Phone number
              </label>

              {hasInput && (
                <button
                  type="button"
                  className="clear-button"
                  onClick={clearInput}
                >
                  Clear
                </button>
              )}
            </div>

            <div
              className={`phone-input-wrapper ${
                checked
                  ? valid || isPrefixOnly
                    ? 'input-valid'
                    : 'input-invalid'
                  : ''
              }`}
            >
              <div className="country-icon">
                🇰🇭
              </div>

              <input
                id="phone-number"
                type="text"
                inputMode="tel"
                autoComplete="tel"
                aria-label="Cambodian phone number"
                placeholder="010 123 456"
                value={value}
                onChange={(event) =>
                  handleInputChange(event.target.value)
                }
              />

              {hasInput && (
                <button
                  type="button"
                  className="input-clear"
                  onClick={clearInput}
                  aria-label="Clear phone number"
                >
                  ×
                </button>
              )}
            </div>

            <div className="input-footer">
              <p>
                Example: 010 123 456 · +855 10 123 456
              </p>

              <button
                type="submit"
                className="check-button"
                disabled={!hasInput}
              >
                <span>Check number</span>
                <span className="arrow">→</span>
              </button>
            </div>
          </form>

          {/* QUICK PREFIXES */}
          <div className="quick-section">
            <div className="quick-label">
              Try an example
            </div>

            <div className="prefix-list">
              {EXAMPLES.map((example) => (
                <button
                  key={example.label}
                  type="button"
                  className="prefix-chip"
                  onClick={() => useExample(example.number)}
                >
                  {example.label}
                </button>
              ))}
            </div>
          </div>

          {/* ================= RESULT ================= */}
          {checked && (
            <div className="result-section">

              {/* Status */}
              <div className="result-status">
                <div
                  className={`status-icon ${
                    valid || isPrefixOnly
                      ? 'status-success'
                      : 'status-error'
                  }`}
                >
                  {valid || isPrefixOnly ? '✓' : '×'}
                </div>

                <div>
                  <div
                    className={`status-title ${
                      valid || isPrefixOnly
                        ? 'success-text'
                        : 'error-text'
                    }`}
                  >
                    {valid
                      ? 'Valid Cambodian number'
                      : isPrefixOnly
                        ? 'Prefix detected'
                        : 'Invalid number'}
                  </div>

                  <div className="status-description">
                    {valid
                      ? 'The number format looks correct.'
                      : isPrefixOnly
                        ? 'Enter the remaining digits to validate the number.'
                        : 'Please check the number and try again.'}
                  </div>
                </div>
              </div>

              {/* Result card */}
              <div className="result-card">

                <div className="result-glow" />

                <div className="result-content">

                  {/* Operator */}
                  <div className="operator-row">

                    <div className="operator-info">
                      <div className="operator-icon">
                        {operator?.name === 'Smart'
                          ? 'S'
                          : operator?.name === 'Cellcard'
                            ? 'C'
                            : operator?.name === 'Metfone'
                              ? 'M'
                              : operator?.name === 'qb'
                                ? 'Q'
                                : '?'}
                      </div>

                      <div>
                        <div className="small-label">
                          Assigned operator
                        </div>

                        <h2>
                          {operator?.name ?? 'Unknown'}
                        </h2>
                      </div>
                    </div>

                    <div className="prefix-badge">
                      <span>Prefix</span>
                      <strong>
                        {normalized
                          ? normalized.slice(0, 3)
                          : '-'}
                      </strong>
                    </div>
                  </div>

                  {/* Local number */}
                  <div className="number-block">
                    <div className="small-label">
                      Local format
                    </div>

                    <div className="number-row">
                      <div className="phone-number">
                        {formatLocal(normalized) || '-'}
                      </div>

                      <button
                        type="button"
                        className="copy-button"
                        onClick={() =>
                          copyNumber(
                            formatLocal(normalized),
                            'local',
                          )
                        }
                      >
                        {copied === 'local'
                          ? '✓ Copied'
                          : 'Copy'}
                      </button>
                    </div>
                  </div>

                  {/* International number */}
                  <div className="international-card">
                    <div>
                      <div className="small-label">
                        International
                      </div>

                      <div className="international-number">
                        {formatInternational(normalized) || '-'}
                      </div>
                    </div>

                    <button
                      type="button"
                      className="international-copy"
                      onClick={() =>
                        copyNumber(
                          formatInternational(normalized),
                          'international',
                        )
                      }
                    >
                      {copied === 'international'
                        ? 'Copied ✓'
                        : 'Copy'}
                    </button>
                  </div>

                  {/* Information */}
                  <div className="info-note">
                    <span>ⓘ</span>

                    <p>
                      Prefix information represents the operator
                      assignment associated with the number prefix.
                      It does not guarantee the current carrier
                      after number portability.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </section>

        {/* ================= STATS ================= */}
        <div className="stats-grid">
          <Stat
            icon="🇰🇭"
            value="KH"
            label="Cambodia"
          />

          <Stat
            icon="⌁"
            value="30+"
            label="Prefixes"
          />

          <Stat
            icon="◈"
            value="4+"
            label="Operators"
          />
        </div>

        {/* FOOTER */}
        <footer className="footer">
          <span>🇰🇭</span>
          <span>Khmer Number Checker</span>
          <span>·</span>
          <span>Built for Cambodia</span>
        </footer>
      </div>
    </main>
  )
}

function Stat({
  icon,
  value,
  label,
}: {
  icon: string
  value: string
  label: string
}) {
  return (
    <div className="stat-card">
      <div className="stat-icon">
        {icon}
      </div>

      <div className="stat-value">
        {value}
      </div>

      <div className="stat-label">
        {label}
      </div>
    </div>
  )
}

export default App