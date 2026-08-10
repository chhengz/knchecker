import { useState } from 'react'
import {
  normalizePhoneNumber,
  detectOperator,
  isCambodianPhoneNumber,
  formatLocal,
  formatInternational,
} from './services/phoneChecker'

function App() {
  const [value, setValue] = useState('')
  const [checked, setChecked] = useState(false)

  const normalized = normalizePhoneNumber(value)
  const operator = detectOperator(value)
  const valid = isCambodianPhoneNumber(value)

  function onCheck(e: React.FormEvent) {
    e.preventDefault()
    setChecked(true)
  }

  return (
    <div className="min-h-screen flex items-start justify-center py-12 px-4">
      <div className="w-full max-w-md">
        <h1 className="text-2xl font-semibold mb-6 text-center">Khmer Number Checker</h1>

        <form onSubmit={onCheck} className="flex gap-2 mb-4">
          <input
            aria-label="phone-input"
            className="flex-1 px-3 py-2 border rounded-md bg-white dark:bg-slate-800"
            placeholder="e.g. 010 123 456 or +85510123456"
            value={value}
            onChange={(e) => {
              setValue(e.target.value)
              setChecked(false)
            }}
          />
          <button className="btn" type="submit">Check</button>
        </form>

        {checked && (
          <div className="space-y-3">
            <div className={`inline-block px-3 py-1 rounded ${valid ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
              {valid ? '✓ Valid Cambodian No.' : '✕ Invalid number'}
            </div>

            <div className="p-4 border rounded-md bg-white dark:bg-slate-800">
              <h2 className="text-lg font-semibold mb-1">{operator ? operator.name.toUpperCase() : 'UNKNOWN'}</h2>
              <p className="font-mono text-sm mb-1">{formatLocal(normalized)}</p>
              <p className="text-sm text-slate-600 dark:text-slate-300">International: {formatInternational(normalized)}</p>
              <p className="text-sm text-slate-600 dark:text-slate-300 mt-2">Prefix: {normalized ? normalized.slice(0, 3) : '-'}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default App
