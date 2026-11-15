const MONTH_LABELS = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
]

function parsePeriod(value) {
  if (value == null || value === '') {
    return null
  }

  const parts = String(value).split('-').map(Number)
  const year = parts[0]
  const month = parts.length > 1 ? parts[1] : 1

  if (!year || Number.isNaN(year)) {
    return null
  }

  return { year, month: Number.isNaN(month) ? 1 : month }
}

function formatPeriod(value, { presentLabel = 'Present', yearOnly = false } = {}) {
  if (value == null) {
    return presentLabel
  }

  const parsed = parsePeriod(value)
  if (!parsed) {
    return String(value)
  }

  if (yearOnly || String(value).length === 4) {
    return String(parsed.year)
  }

  return `${MONTH_LABELS[parsed.month - 1]} ${parsed.year}`
}

function monthsBetween(start, end) {
  return (end.year - start.year) * 12 + (end.month - start.month)
}

function formatDurationMonths(totalMonths) {
  if (totalMonths < 0) {
    return ''
  }

  if (totalMonths === 0) {
    return '1 month'
  }

  const years = Math.floor(totalMonths / 12)
  const months = totalMonths % 12
  const parts = []

  if (years > 0) {
    parts.push(`${years} ${years === 1 ? 'year' : 'years'}`)
  }

  if (months > 0) {
    parts.push(`${months} ${months === 1 ? 'month' : 'months'}`)
  }

  return parts.join(' ')
}

export function formatTimeline(start, end, options = {}) {
  const yearOnly = options.yearOnly === true
  const startLabel = formatPeriod(start, { yearOnly })
  const endLabel = formatPeriod(end, { yearOnly, presentLabel: 'Present' })

  if (startLabel === endLabel) {
    return startLabel
  }

  return `${startLabel} - ${endLabel}`
}

export function formatDuration(start, end) {
  const startPeriod = parsePeriod(start)
  if (!startPeriod) {
    return ''
  }

  const endPeriod =
    end == null
      ? { year: new Date().getFullYear(), month: new Date().getMonth() + 1 }
      : parsePeriod(end)

  if (!endPeriod) {
    return ''
  }

  // Year-only ranges (education) skip duration
  if (String(start).length === 4 && (end == null || String(end).length === 4)) {
    return ''
  }

  const totalMonths = monthsBetween(startPeriod, endPeriod)
  return formatDurationMonths(totalMonths)
}

export function formatTimelineWithDuration(start, end, options = {}) {
  const timeline = formatTimeline(start, end, options)
  const duration = options.showDuration === false ? '' : formatDuration(start, end)

  if (!duration) {
    return timeline
  }

  return `${timeline} (${duration})`
}
