import React, { useState, useMemo, useEffect } from 'react';

/* ---------------------------------------------------------------
   Brand tokens (Align Advisor Consulting palette)
--------------------------------------------------------------- */
const COLOR = {
  oxblood: '#4A241A',
  nearBlack: '#2A2723',
  tan: '#D2BE9E',
  tanLight: '#F3ECDF',
  paper: '#FFFEFA',
  white: '#FFFFFF',
  sage: '#98A77E',
  olive: '#5A653F',
  taupe: '#A89F8F',
  terracotta: '#CC8E73',
  error: '#A63A2C',
  errorBg: '#FBEDE9',
  border: '#E4DCCB',
};

const FONT_HEAD = "'Constantia', 'Iowan Old Style', 'Palatino Linotype', Palatino, Georgia, serif";
const FONT_BODY = "'Corbel', 'Segoe UI', 'Calibri', system-ui, -apple-system, sans-serif";

const BOOKING_URL = 'https://www.alignadvisorconsulting.com/booking-calendar/15-minute-intro-meeting';

/* ---------------------------------------------------------------
   Static option lists
--------------------------------------------------------------- */
const FEE_MODELS = [
  { key: 'aum', label: 'AUM (%)' },
  { key: 'planningFee', label: 'Planning fee ($)' },
  { key: 'subscription', label: 'Subscription ($)' },
  { key: 'hourly', label: 'Hourly ($)' },
];

const FREQUENCY_OPTIONS = ['Monthly', 'Quarterly', 'Semi-annual', 'Annual', 'As needed (reactive)', 'Other'];

const MEETING_TYPES = [
  { key: 'annualReview', label: 'Annual Review' },
  { key: 'quarterlyReview', label: 'Quarterly Review' },
  { key: 'taxPlanning', label: 'Tax Planning' },
  { key: 'springPlanning', label: 'Spring Planning Topic' },
];

const SERVICING_TEAM_OPTIONS = [
  { key: 'mostSeniorAdvisors', label: 'Most senior advisors' },
  { key: 'dedicatedService', label: 'Dedicated service' },
  { key: 'teamBased', label: 'Team-based approach' },
];

const ACCESS_OPTIONS = [
  { key: 'conciergeEmail', label: 'Access to concierge@firm email' },
  { key: 'basedOnPreference', label: 'Meeting format based on client preference' },
];

const INVESTMENT_OFFERINGS = [
  { key: 'traditional', label: 'Traditional investments' },
  { key: 'alternatives', label: 'Alternatives / private investments' },
];

const INVESTMENT_APPROACH = [
  { key: 'customInHouse', label: 'Custom investment selection, in-house' },
  { key: 'semiCustomInHouse', label: 'Semi-custom (custom and models), in-house' },
  { key: 'modelsInHouse', label: 'Models, in-house' },
  { key: 'modelsOutsourced', label: 'Models, outsourced' },
  { key: 'umh', label: 'Unified Managed Household (UMH)' },
  { key: 'sma', label: 'Separately Managed Account strategies (SMA)' },
  { key: 'taxOptimization', label: 'Tax optimization (tax-loss harvesting)' },
  { key: 'taxTransitioning', label: 'Tax transitioning' },
  { key: 'systematicRebalancing', label: 'Systematic rebalancing' },
  { key: 'dueDiligence', label: 'Investment due diligence' },
  { key: 'riskAssessment', label: 'Risk assessment' },
  { key: 'distributionFocused', label: 'Distribution-focused strategies' },
  { key: 'targetAllocation', label: 'Target allocation strategies' },
  { key: 'objectiveBased', label: 'Objective-based strategies' },
];

const PLANNING_BASIC = [
  { key: 'retirement', label: 'Retirement planning' },
  { key: 'cashFlow', label: 'Cash flow analysis' },
  { key: 'budgeting', label: 'Budgeting' },
  { key: 'goalSetting', label: 'Goal setting' },
];

const PLANNING_SPECIALIZED = [
  { key: 'taxPlanning', label: 'Tax planning' },
  { key: 'estatePlanning', label: 'Estate planning' },
  { key: 'charitableGiving', label: 'Charitable giving / planning' },
  { key: 'insurancePlanning', label: 'Insurance planning' },
  { key: 'healthcarePlanning', label: 'Healthcare planning' },
  { key: 'trustServices', label: 'Trust services' },
  { key: 'bankingServices', label: 'Banking services' },
  { key: 'businessOwnerServices', label: 'Business owner services' },
  { key: 'conciergeServices', label: 'Concierge services' },
  { key: 'consulting', label: 'Consulting' },
  { key: 'multiGenPlanning', label: 'Multi-generational planning' },
  { key: 'microMomentAutomation', label: 'Micro-moment automation' },
  { key: 'adviceEngagement', label: 'Advice engagement' },
  { key: 'aiPlanningAdvice', label: 'AI planning and advice' },
];

// Deliverables with a natural annual date/cadence — these appear on the calendar.
const DELIVERABLE_OPTIONS = [
  { key: 'annualUpdates', label: 'Annual plan updates' },
  { key: 'onePagePlan', label: 'One-page financial plan' },
  { key: 'trackingGoals', label: 'Tracking towards goals' },
  { key: 'taxesSavedReports', label: 'Taxes saved reports' },
  { key: 'serviceSchedule', label: 'Service schedule / calendar' },
  { key: 'spendingGuardrails', label: 'Spending guardrails report' },
];

// Deliverables with no natural date — shown in the overview / services list instead of the calendar.
const DELIVERABLE_FLAG_OPTIONS = [
  { key: 'initialPlan', label: 'Initial financial plan' },
];

const VALUEADD_OPTIONS = [
  { key: 'events', label: 'Events' },
  { key: 'gifts', label: 'Gifts' },
  { key: 'community', label: 'Community' },
  { key: 'education', label: 'Education' },
  { key: 'expertsAccess', label: 'Access to experts' },
  { key: 'multiGenSupport', label: 'Multi-generational support' },
];

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const MONTHS_FULL = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

// Controlled timing choices (dropdown) so every selection maps to an exact
// set of calendar months — no free-text guessing. Recurring choices resolve
// to multiple months; "As needed (reactive)" and "Monthly" resolve to all 12.
const TIMING_TO_MONTHS = {
  January: [1], February: [2], March: [3], April: [4], May: [5], June: [6],
  July: [7], August: [8], September: [9], October: [10], November: [11], December: [12],
  Q1: [2], Q2: [5], Q3: [8], Q4: [11],
  Monthly: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
  Quarterly: [1, 4, 7, 10],
  'Semi-annual': [1, 7],
  'As needed (reactive)': [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
};
const TIMING_GROUPS = [
  { label: 'Specific month', options: MONTHS_FULL },
  { label: 'Quarter', options: ['Q1', 'Q2', 'Q3', 'Q4'] },
  { label: 'Recurring', options: ['Monthly', 'Quarterly', 'Semi-annual', 'As needed (reactive)'] },
];

const GROUP_COLOR = { Meeting: COLOR.oxblood, Virtual: COLOR.olive, Communications: COLOR.sage, Deliverable: COLOR.taupe, 'Value-add': COLOR.terracotta };

/* ---------------------------------------------------------------
   Factories / defaults
--------------------------------------------------------------- */
function makeToggleMap(options) {
  const map = {};
  options.forEach((o) => { map[o.key] = { selected: false, timing: '' }; });
  return map;
}
function makeFlagMap(options) {
  const map = {};
  options.forEach((o) => { map[o.key] = false; });
  return map;
}

function makeSegment() {
  return {
    name: '',
    persona: '',
    objective: '',
    feeModels: { ...makeFlagMap(FEE_MODELS), otherSelected: false, otherText: '' },
    feeAmounts: {},
    servicingTeam: { ...makeFlagMap(SERVICING_TEAM_OPTIONS), otherSelected: false, otherText: '' },
    teamComposition: '',
    directAccess: '',
    responseSLA: '',
    inPersonFrequency: '',
    meetingTypes: { ...makeToggleMap(MEETING_TYPES), otherSelected: false, otherText: '', otherTiming: '' },
    virtualFrequency: '',
    virtualMeetingTypes: { ...makeToggleMap(MEETING_TYPES), otherSelected: false, otherText: '', otherTiming: '' },
    emailComms: [{ name: '', timing: '' }],
    accessOptions: { ...makeFlagMap(ACCESS_OPTIONS), otherSelected: false, otherText: '', videoUpdates: { selected: false, timing: '' } },
    investment: { ...makeFlagMap(INVESTMENT_OFFERINGS), ...makeFlagMap(INVESTMENT_APPROACH), otherSelected: false, otherText: '' },
    planning: { ...makeFlagMap(PLANNING_BASIC), ...makeFlagMap(PLANNING_SPECIALIZED), otherSelected: false, otherText: '' },
    deliverables: { ...makeFlagMap(DELIVERABLE_FLAG_OPTIONS), ...makeToggleMap(DELIVERABLE_OPTIONS), otherSelected: false, otherText: '', otherTiming: '' },
    valueAdd: { ...makeToggleMap(VALUEADD_OPTIONS), otherSelected: false, otherText: '', otherTiming: '' },
  };
}

const INITIAL_INTRO = {
  firmName: '',
  hasSegments: '', // 'yes' | 'no'
  numSegments: null,
  serviceApproach: '',
};

function selectedLabels(options, stateObj, otherSelected, otherText) {
  const labels = options.filter((o) => stateObj[o.key]).map((o) => o.label);
  if (otherSelected && otherText && otherText.trim()) labels.push(otherText.trim());
  return labels;
}

/* Fee models are multi-select — these helpers turn the selection into a
   flat list of {key, label} pairs (including a custom "Other" entry),
   used for validation, the amount-per-model screen, and the overview row. */
function selectedFeeModels(seg) {
  const picked = FEE_MODELS.filter((f) => seg.feeModels[f.key]);
  if (seg.feeModels.otherSelected && seg.feeModels.otherText.trim()) {
    picked.push({ key: 'other', label: seg.feeModels.otherText.trim() });
  }
  return picked;
}
function hasAnyFeeModel(seg) { return selectedFeeModels(seg).length > 0; }
function allFeeAmountsFilled(seg) {
  const picked = selectedFeeModels(seg);
  if (!picked.length) return false;
  return picked.every((f) => (seg.feeAmounts[f.key] || '').trim());
}

/* ---------------------------------------------------------------
   Small reusable UI atoms (inline styles only)
--------------------------------------------------------------- */
function FieldLabel({ children, required, small }) {
  return (
    <label style={{ display: 'block', fontFamily: FONT_HEAD, fontSize: small ? 16 : 22, color: COLOR.nearBlack, marginBottom: small ? 6 : 10, lineHeight: 1.3 }}>
      {children}
      {required ? <span style={{ color: COLOR.oxblood }}> *</span> : null}
    </label>
  );
}

function HelpText({ children }) {
  if (!children) return null;
  return <p style={{ fontSize: 14, color: '#6B6459', marginTop: -4, marginBottom: 14 }}>{children}</p>;
}

function ErrorText({ children }) {
  if (!children) return null;
  return (
    <div style={{ background: COLOR.errorBg, color: COLOR.error, fontSize: 14, padding: '8px 12px', borderRadius: 6, marginTop: 8 }}>
      {children}
    </div>
  );
}

const inputBase = {
  width: '100%',
  fontSize: 16,
  padding: '12px 14px',
  border: `1.5px solid ${COLOR.border}`,
  borderRadius: 8,
  background: COLOR.white,
  color: COLOR.nearBlack,
  fontFamily: FONT_BODY,
};

function TextArea({ value, onChange, placeholder, rows = 3 }) {
  return (
    <textarea value={value} onChange={onChange} placeholder={placeholder} rows={rows} style={{ ...inputBase, resize: 'vertical', lineHeight: 1.5 }} />
  );
}
function TextInput(props) {
  return <input type="text" {...props} style={{ ...inputBase, ...(props.style || {}) }} />;
}

/* Controlled timing dropdown — every choice maps to exact calendar month(s)
   via TIMING_TO_MONTHS, so nothing needs to be parsed or guessed. */
function TimingSelect({ value, onChange }) {
  return (
    <select value={value} onChange={onChange} style={{ ...inputBase, fontSize: 14, padding: '9px 12px', cursor: 'pointer' }}>
      <option value="">Select timing…</option>
      {TIMING_GROUPS.map((group) => (
        <optgroup key={group.label} label={group.label}>
          {group.options.map((opt) => <option key={opt} value={opt}>{opt}</option>)}
        </optgroup>
      ))}
    </select>
  );
}

function PrimaryButton({ children, onClick, disabled, style }) {
  return (
    <button onClick={onClick} disabled={disabled} style={{
      background: disabled ? '#C9BBAE' : COLOR.oxblood, color: COLOR.paper, border: 'none', borderRadius: 8,
      padding: '13px 26px', fontSize: 16, fontWeight: 600, cursor: disabled ? 'not-allowed' : 'pointer', fontFamily: FONT_BODY, ...style,
    }}>
      {children}
    </button>
  );
}
function SecondaryButton({ children, onClick, style }) {
  return (
    <button onClick={onClick} style={{
      background: 'transparent', color: COLOR.oxblood, border: `1.5px solid ${COLOR.oxblood}`, borderRadius: 8,
      padding: '11px 24px', fontSize: 16, fontWeight: 600, cursor: 'pointer', fontFamily: FONT_BODY, ...style,
    }}>
      {children}
    </button>
  );
}

function CheckboxRow({ checked, onToggle, label, timing, onTimingChange }) {
  return (
    <div style={{ marginBottom: 10 }}>
      <label style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer', padding: '10px 12px', border: `1.5px solid ${checked ? COLOR.oxblood : COLOR.border}`, borderRadius: 8, background: checked ? COLOR.tanLight : COLOR.white }}>
        <input type="checkbox" checked={checked} onChange={onToggle} style={{ width: 18, height: 18, accentColor: COLOR.oxblood, flexShrink: 0 }} />
        <span style={{ fontSize: 16 }}>{label}</span>
      </label>
      {checked && onTimingChange ? (
        <div style={{ marginTop: 6, marginLeft: 8 }}>
          <TimingSelect value={timing} onChange={onTimingChange} />
        </div>
      ) : null}
    </div>
  );
}

function ProgressBar({ fraction }) {
  return (
    <div style={{ width: '100%', height: 6, background: COLOR.tanLight, borderRadius: 3, overflow: 'hidden', marginBottom: 22 }}>
      <div style={{ width: `${Math.round(fraction * 100)}%`, height: '100%', background: COLOR.oxblood, transition: 'width 0.25s ease' }} />
    </div>
  );
}

/* Intro banner shown on the first screen only */
function IntroBanner() {
  return (
    <div style={{ marginBottom: 28 }}>
      <span style={{ display: 'inline-block', background: COLOR.sage, color: COLOR.paper, fontSize: 12, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', padding: '4px 10px', borderRadius: 4, marginBottom: 14 }}>
        Completely free
      </span>
      <h1 style={{ fontFamily: FONT_HEAD, fontSize: 'clamp(30px, 6vw, 40px)', color: COLOR.oxblood, lineHeight: 1.1, margin: '0 0 12px' }}>
        Service Model Builder
      </h1>
      <p style={{ fontSize: 18, lineHeight: 1.5, color: COLOR.nearBlack, margin: '0 0 20px' }}>
        Answer a few questions about how you serve your clients. At the end, you'll get two print-ready pages built from your answers.
      </p>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 14, marginBottom: 18 }}>
        <IntroDeliverable title="One-Page Client Service Overview" text="What clients get when they work with you, on a single page." />
        <IntroDeliverable title="Client Service Calendar" text="Your year of client touchpoints, laid out month by month." />
      </div>
      <p style={{ fontSize: 15, lineHeight: 1.5, color: '#6B6459', margin: 0 }}>
        Use them with clients and prospects, send them to a designer, or put them on your website.
      </p>
      <div style={{ height: 1, background: COLOR.border, marginTop: 24 }} />
    </div>
  );
}

function IntroDeliverable({ title, text }) {
  return (
    <div style={{ borderTop: `3px solid ${COLOR.tan}`, paddingTop: 10 }}>
      <div style={{ fontFamily: FONT_HEAD, fontSize: 18, color: COLOR.oxblood, marginBottom: 4 }}>{title}</div>
      <div style={{ fontSize: 15, lineHeight: 1.45, color: COLOR.nearBlack }}>{text}</div>
    </div>
  );
}

function QuestionShell({ header, eyebrow, progressFraction, children, onBack, onNext, nextLabel = 'Next', showBack = true, nextDisabled }) {
  return (
    <div style={pageWrap}>
      <div style={cardWrap}>
        <div style={datumRule} />
        <div style={{ paddingLeft: 26 }}>
          {header}
          {eyebrow ? (
            <div style={{ fontSize: 13, letterSpacing: '0.06em', textTransform: 'uppercase', color: COLOR.oxblood, fontWeight: 700, marginBottom: 10 }}>{eyebrow}</div>
          ) : null}
          <ProgressBar fraction={progressFraction} />
          {children}
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 28, gap: 12 }}>
            {showBack ? <SecondaryButton onClick={onBack}>Back</SecondaryButton> : <span />}
            <PrimaryButton onClick={onNext} disabled={nextDisabled}>{nextLabel}</PrimaryButton>
          </div>
        </div>
      </div>
    </div>
  );
}

const pageWrap = { minHeight: '100vh', background: COLOR.paper, display: 'flex', justifyContent: 'center', padding: '32px 16px 60px', fontFamily: FONT_BODY };
const cardWrap = { width: '100%', maxWidth: 640, position: 'relative' };
const datumRule = { position: 'absolute', left: 0, top: 4, bottom: 4, width: 4, background: COLOR.oxblood, borderRadius: 2 };

/* ---------------------------------------------------------------
   Step map — built once per (hasSegments, numSegments) combo so
   Back/Next always walk the SAME array, keeping currentQ tracking
   correct across segment boundaries.
--------------------------------------------------------------- */
function buildSteps(hasSegments, numSegmentsInput) {
  const steps = [{ id: 'firmName' }, { id: 'hasSegments' }];
  if (hasSegments === 'yes') steps.push({ id: 'segCount' }, { id: 'segApproach' });

  const numSegments = hasSegments === 'no' ? 1 : (numSegmentsInput || 0);

  const perSegmentIds = [
    ...(hasSegments === 'yes' ? ['name'] : []),
    'persona', 'objective', 'feeModel', 'feeAmount',
    'servicingTeam', 'teamAccess', 'responseSLA',
    'inPersonMeetings', 'meetingTypes',
    'virtualMeetings', 'virtualMeetingTypes',
    'emailComms', 'accessOptions',
    'investment', 'planning',
    'deliverables', 'valueAdd',
  ];

  for (let s = 0; s < numSegments; s++) {
    perSegmentIds.forEach((fieldId, i) => {
      steps.push({ id: `seg-${fieldId}`, seg: s, qIndex: i + 1, qTotal: perSegmentIds.length });
    });
  }
  if (numSegments > 0) steps.push({ id: 'preview' });
  return steps;
}

/* ---------------------------------------------------------------
   Main App
--------------------------------------------------------------- */
export default function App() {
  const [stepIndex, setStepIndex] = useState(0);
  const [intro, setIntro] = useState(INITIAL_INTRO);
  const [segments, setSegments] = useState([]);
  const [error, setError] = useState('');

  const steps = useMemo(() => buildSteps(intro.hasSegments, intro.numSegments), [intro.hasSegments, intro.numSegments]);
  const safeStepIndex = Math.min(stepIndex, steps.length - 1);
  const step = steps[safeStepIndex];

  useEffect(() => {
    const target = intro.hasSegments === 'no' ? 1 : (intro.numSegments || 0);
    setSegments((prev) => {
      if (target === prev.length) return prev;
      const next = prev.slice(0, target);
      while (next.length < target) next.push(makeSegment());
      return next;
    });
  }, [intro.hasSegments, intro.numSegments]);

  function goTo(nextIndex) { setError(''); setStepIndex(Math.max(0, Math.min(nextIndex, steps.length - 1))); }
  function goNext() {
    const err = validateStep(step, intro, segments);
    if (err) { setError(err); return; }
    goTo(safeStepIndex + 1);
  }
  function goBack() { goTo(safeStepIndex - 1); }

  function updateIntro(patch) { setError(''); setIntro((prev) => ({ ...prev, ...patch })); }
  function updateSegment(segIdx, patch) { setError(''); setSegments((prev) => prev.map((seg, i) => (i === segIdx ? { ...seg, ...patch } : seg))); }
  function updateSegmentField(segIdx, field, subPatch) { setError(''); setSegments((prev) => prev.map((seg, i) => (i === segIdx ? { ...seg, [field]: { ...seg[field], ...subPatch } } : seg))); }

  function startOver() {
    if (window.confirm("Start over? This clears everything you've entered.")) {
      setIntro(INITIAL_INTRO); setSegments([]); setStepIndex(0); setError('');
    }
  }

  if (!step) return null;

  if (step.id === 'preview') {
    return <Preview intro={intro} segments={segments} onBack={goBack} onStartOver={startOver} />;
  }

  if (step.id === 'firmName') {
    return (
      <QuestionShell header={<IntroBanner />} eyebrow="Getting started" progressFraction={(safeStepIndex + 1) / steps.length} showBack={false} onNext={goNext}>
        <FieldLabel required>What's your firm name?</FieldLabel>
        <HelpText>This appears as the title of your one-pager.</HelpText>
        <TextInput value={intro.firmName} onChange={(e) => updateIntro({ firmName: e.target.value })} placeholder="e.g., Align Advisor Consulting" />
        <ErrorText>{error}</ErrorText>
      </QuestionShell>
    );
  }

  if (step.id === 'hasSegments') {
    return (
      <QuestionShell eyebrow="Getting started" progressFraction={(safeStepIndex + 1) / steps.length} onBack={goBack} onNext={goNext}>
        <FieldLabel required>Do you currently serve different client groups with different service models?</FieldLabel>
        <RadioCard
          options={[{ value: 'yes', label: 'Yes, I already segment clients' }, { value: 'no', label: 'No, I have one service model for all clients' }]}
          value={intro.hasSegments}
          onChange={(v) => updateIntro({ hasSegments: v, numSegments: v === 'no' ? null : intro.numSegments })}
        />
        <ErrorText>{error}</ErrorText>
      </QuestionShell>
    );
  }

  if (step.id === 'segCount') {
    return (
      <QuestionShell eyebrow="Getting started" progressFraction={(safeStepIndex + 1) / steps.length} onBack={goBack} onNext={goNext}>
        <FieldLabel required>How many client segments do you have?</FieldLabel>
        <HelpText>Choose between 2 and 5.</HelpText>
        <RadioCard options={[2, 3, 4, 5].map((n) => ({ value: n, label: String(n) }))} value={intro.numSegments} onChange={(v) => updateIntro({ numSegments: v })} inline />
        <ErrorText>{error}</ErrorText>
      </QuestionShell>
    );
  }

  if (step.id === 'segApproach') {
    return (
      <QuestionShell eyebrow="Getting started" progressFraction={(safeStepIndex + 1) / steps.length} onBack={goBack} onNext={goNext}>
        <FieldLabel required>What's your service offering approach across segments?</FieldLabel>
        <RadioCard
          options={[{ value: 'different', label: 'Different services per segment' }, { value: 'depth', label: 'Same core services, different depth' }, { value: 'mix', label: 'Mix of both' }]}
          value={intro.serviceApproach}
          onChange={(v) => updateIntro({ serviceApproach: v })}
        />
        <ErrorText>{error}</ErrorText>
      </QuestionShell>
    );
  }

  if (step.id.startsWith('seg-')) {
    const seg = segments[step.seg] || makeSegment();
    const segLabel = intro.hasSegments === 'no' ? 'your service model' : (seg.name || `Segment ${step.seg + 1}`);
    const eyebrow = intro.hasSegments === 'no'
      ? `Question ${step.qIndex} of ${step.qTotal}`
      : `Segment ${step.seg + 1} of ${segments.length} — Question ${step.qIndex} of ${step.qTotal}`;

    const common = { seg, segIdx: step.seg, segLabel, updateSegment, updateSegmentField };
    return (
      <QuestionShell
        eyebrow={eyebrow}
        progressFraction={(safeStepIndex + 1) / steps.length}
        onBack={goBack}
        onNext={goNext}
        nextLabel={safeStepIndex === steps.length - 2 ? (segments.length > 1 && step.seg < segments.length - 1 ? 'Next segment' : 'Preview') : 'Next'}
      >
        <SegmentField fieldId={step.id.replace('seg-', '')} {...common} />
        <ErrorText>{error}</ErrorText>
      </QuestionShell>
    );
  }

  return null;
}

function RadioCard({ options, value, onChange, inline }) {
  return (
    <div style={{ display: 'flex', flexDirection: inline ? 'row' : 'column', flexWrap: 'wrap', gap: 10 }}>
      {options.map((opt) => {
        const selected = value === opt.value;
        return (
          <button key={String(opt.value)} onClick={() => onChange(opt.value)} style={{
            textAlign: 'left', padding: '13px 16px', borderRadius: 8, border: `1.5px solid ${selected ? COLOR.oxblood : COLOR.border}`,
            background: selected ? COLOR.tanLight : COLOR.white, color: COLOR.nearBlack, fontSize: 16, cursor: 'pointer', fontFamily: FONT_BODY,
            minWidth: inline ? 56 : undefined, flex: inline ? '0 0 auto' : undefined,
          }}>
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}

/* ---------------------------------------------------------------
   Validation
--------------------------------------------------------------- */
function validateStep(step, intro, segments) {
  if (step.id === 'firmName' && !intro.firmName.trim()) return 'Please enter your firm name.';
  if (step.id === 'hasSegments' && !intro.hasSegments) return 'Please choose an option to continue.';
  if (step.id === 'segCount' && !intro.numSegments) return 'Please choose how many segments you have.';
  if (step.id === 'segApproach' && !intro.serviceApproach) return 'Please choose an option to continue.';

  if (step.id.startsWith('seg-')) {
    const seg = segments[step.seg];
    if (!seg) return '';
    const field = step.id.replace('seg-', '');
    if (field === 'name' && !seg.name.trim()) return 'Please enter a name for this segment.';
    if (field === 'persona' && !seg.persona.trim()) return "Please describe this segment's persona.";
    if (field === 'objective' && !seg.objective.trim()) return 'Please enter a primary objective.';
    if (field === 'feeModel' && !hasAnyFeeModel(seg)) return 'Please select at least one fee model.';
    if (field === 'feeAmount' && !allFeeAmountsFilled(seg)) return 'Please enter an amount or rate for each selected fee model.';
  }
  return '';
}

/* ---------------------------------------------------------------
   Per-segment question renderer
--------------------------------------------------------------- */
function SegmentField({ fieldId, seg, segIdx, segLabel, updateSegment, updateSegmentField }) {
  switch (fieldId) {
    case 'name':
      return (
        <>
          <FieldLabel required>Segment name</FieldLabel>
          <HelpText>e.g., Platinum, Gold, Silver or A, AA, AAA</HelpText>
          <TextArea rows={1} value={seg.name} onChange={(e) => updateSegment(segIdx, { name: e.target.value })} placeholder="e.g., Platinum" />
        </>
      );

    case 'persona':
      return (
        <>
          <FieldLabel required>Describe the {segLabel} persona</FieldLabel>
          <TextArea value={seg.persona} onChange={(e) => updateSegment(segIdx, { persona: e.target.value })} placeholder="e.g., High-net-worth executives, age 50–65" />
        </>
      );

    case 'objective':
      return (
        <>
          <FieldLabel required>Primary objective for {segLabel}</FieldLabel>
          <TextArea value={seg.objective} onChange={(e) => updateSegment(segIdx, { objective: e.target.value })} placeholder="e.g., Preserve wealth and coordinate a tax-efficient retirement transition" />
        </>
      );

    case 'feeModel':
      return (
        <>
          <FieldLabel required>Fee model(s) for {segLabel}</FieldLabel>
          <HelpText>Check all that apply — segments can combine more than one fee model.</HelpText>
          {FEE_MODELS.map((f) => (
            <CheckboxRow key={f.key} label={f.label} checked={seg.feeModels[f.key]}
              onToggle={() => updateSegmentField(segIdx, 'feeModels', { [f.key]: !seg.feeModels[f.key] })} />
          ))}
          <OtherField selected={seg.feeModels.otherSelected} text={seg.feeModels.otherText}
            onToggle={() => updateSegmentField(segIdx, 'feeModels', { otherSelected: !seg.feeModels.otherSelected })}
            onTextChange={(e) => updateSegmentField(segIdx, 'feeModels', { otherText: e.target.value })} />
        </>
      );

    case 'feeAmount': {
      const picked = selectedFeeModels(seg);
      return (
        <>
          <FieldLabel required>Fee amount or rate for {segLabel}</FieldLabel>
          {picked.length === 0 ? (
            <HelpText>Go back and select at least one fee model first.</HelpText>
          ) : (
            picked.map((f) => (
              <div key={f.key} style={{ marginBottom: 16 }}>
                <FieldLabel small>{f.label}</FieldLabel>
                <TextInput
                  value={seg.feeAmounts[f.key] || ''}
                  onChange={(e) => updateSegment(segIdx, { feeAmounts: { ...seg.feeAmounts, [f.key]: e.target.value } })}
                  placeholder="e.g., 1.00% or $2,500/year"
                />
              </div>
            ))
          )}
        </>
      );
    }

    case 'servicingTeam':
      return (
        <>
          <FieldLabel>How is {segLabel} serviced?</FieldLabel>
          <HelpText>Check what applies.</HelpText>
          {SERVICING_TEAM_OPTIONS.map((opt) => (
            <CheckboxRow key={opt.key} label={opt.label} checked={seg.servicingTeam[opt.key]}
              onToggle={() => updateSegmentField(segIdx, 'servicingTeam', { [opt.key]: !seg.servicingTeam[opt.key] })} />
          ))}
          <OtherField selected={seg.servicingTeam.otherSelected} text={seg.servicingTeam.otherText}
            onToggle={() => updateSegmentField(segIdx, 'servicingTeam', { otherSelected: !seg.servicingTeam.otherSelected })}
            onTextChange={(e) => updateSegmentField(segIdx, 'servicingTeam', { otherText: e.target.value })} />
        </>
      );

    case 'teamAccess':
      return (
        <>
          <FieldLabel>Team structure & direct access for {segLabel}</FieldLabel>
          <div style={{ marginBottom: 18 }}>
            <FieldLabel small>Who's on the service team?</FieldLabel>
            <TextInput value={seg.teamComposition} onChange={(e) => updateSegment(segIdx, { teamComposition: e.target.value })} placeholder="e.g., Lead Advisor + Senior CSA" />
          </div>
          <div>
            <FieldLabel small>How can this segment reach their advisor directly?</FieldLabel>
            <TextInput value={seg.directAccess} onChange={(e) => updateSegment(segIdx, { directAccess: e.target.value })} placeholder="e.g., Direct phone, cell phone, email" />
          </div>
        </>
      );

    case 'responseSLA':
      return (
        <>
          <FieldLabel>What's the response-time SLA for {segLabel}?</FieldLabel>
          <TextInput value={seg.responseSLA} onChange={(e) => updateSegment(segIdx, { responseSLA: e.target.value })} placeholder="e.g., Within 2 hours, Same day, Within 24 hours" />
        </>
      );

    case 'inPersonMeetings':
      return (
        <>
          <FieldLabel>How often does {segLabel} meet in person?</FieldLabel>
          <RadioCard options={FREQUENCY_OPTIONS.map((f) => ({ value: f, label: f }))} value={seg.inPersonFrequency} onChange={(v) => updateSegment(segIdx, { inPersonFrequency: v })} />
        </>
      );

    case 'meetingTypes':
      return (
        <>
          <FieldLabel>Which in-person meeting types, and when?</FieldLabel>
          <HelpText>Check what applies and choose the timing.</HelpText>
          {MEETING_TYPES.map((mt) => (
            <CheckboxRow key={mt.key} label={mt.label} checked={seg.meetingTypes[mt.key].selected}
              onToggle={() => updateSegmentField(segIdx, 'meetingTypes', { [mt.key]: { ...seg.meetingTypes[mt.key], selected: !seg.meetingTypes[mt.key].selected } })}
              timing={seg.meetingTypes[mt.key].timing}
              onTimingChange={(e) => updateSegmentField(segIdx, 'meetingTypes', { [mt.key]: { ...seg.meetingTypes[mt.key], timing: e.target.value } })} />
          ))}
          <OtherField selected={seg.meetingTypes.otherSelected} text={seg.meetingTypes.otherText} timing={seg.meetingTypes.otherTiming} withTiming
            onToggle={() => updateSegmentField(segIdx, 'meetingTypes', { otherSelected: !seg.meetingTypes.otherSelected })}
            onTextChange={(e) => updateSegmentField(segIdx, 'meetingTypes', { otherText: e.target.value })}
            onTimingChange={(e) => updateSegmentField(segIdx, 'meetingTypes', { otherTiming: e.target.value })} />
        </>
      );

    case 'virtualMeetings':
      return (
        <>
          <FieldLabel>How often does {segLabel} meet virtually / by phone?</FieldLabel>
          <RadioCard options={FREQUENCY_OPTIONS.map((f) => ({ value: f, label: f }))} value={seg.virtualFrequency} onChange={(v) => updateSegment(segIdx, { virtualFrequency: v })} />
        </>
      );

    case 'virtualMeetingTypes':
      return (
        <>
          <FieldLabel>Which virtual meeting types, and when?</FieldLabel>
          <HelpText>Check what applies and choose the timing.</HelpText>
          {MEETING_TYPES.map((mt) => (
            <CheckboxRow key={mt.key} label={mt.label} checked={seg.virtualMeetingTypes[mt.key].selected}
              onToggle={() => updateSegmentField(segIdx, 'virtualMeetingTypes', { [mt.key]: { ...seg.virtualMeetingTypes[mt.key], selected: !seg.virtualMeetingTypes[mt.key].selected } })}
              timing={seg.virtualMeetingTypes[mt.key].timing}
              onTimingChange={(e) => updateSegmentField(segIdx, 'virtualMeetingTypes', { [mt.key]: { ...seg.virtualMeetingTypes[mt.key], timing: e.target.value } })} />
          ))}
          <OtherField selected={seg.virtualMeetingTypes.otherSelected} text={seg.virtualMeetingTypes.otherText} timing={seg.virtualMeetingTypes.otherTiming} withTiming
            onToggle={() => updateSegmentField(segIdx, 'virtualMeetingTypes', { otherSelected: !seg.virtualMeetingTypes.otherSelected })}
            onTextChange={(e) => updateSegmentField(segIdx, 'virtualMeetingTypes', { otherText: e.target.value })}
            onTimingChange={(e) => updateSegmentField(segIdx, 'virtualMeetingTypes', { otherTiming: e.target.value })} />
        </>
      );

    case 'emailComms':
      return <EmailCommsField seg={seg} segIdx={segIdx} updateSegment={updateSegment} />;

    case 'accessOptions':
      return (
        <>
          <FieldLabel>Additional access & communication options for {segLabel}</FieldLabel>
          {ACCESS_OPTIONS.map((opt) => (
            <CheckboxRow key={opt.key} label={opt.label} checked={seg.accessOptions[opt.key]}
              onToggle={() => updateSegmentField(segIdx, 'accessOptions', { [opt.key]: !seg.accessOptions[opt.key] })} />
          ))}
          <CheckboxRow label="Video-based messages / updates" checked={seg.accessOptions.videoUpdates.selected}
            onToggle={() => updateSegmentField(segIdx, 'accessOptions', { videoUpdates: { ...seg.accessOptions.videoUpdates, selected: !seg.accessOptions.videoUpdates.selected } })}
            timing={seg.accessOptions.videoUpdates.timing}
            onTimingChange={(e) => updateSegmentField(segIdx, 'accessOptions', { videoUpdates: { ...seg.accessOptions.videoUpdates, timing: e.target.value } })} />
          <OtherField selected={seg.accessOptions.otherSelected} text={seg.accessOptions.otherText}
            onToggle={() => updateSegmentField(segIdx, 'accessOptions', { otherSelected: !seg.accessOptions.otherSelected })}
            onTextChange={(e) => updateSegmentField(segIdx, 'accessOptions', { otherText: e.target.value })} />
        </>
      );

    case 'investment':
      return (
        <>
          <FieldLabel>Investment management for {segLabel}</FieldLabel>
          <SubHeading>Investment offerings</SubHeading>
          {INVESTMENT_OFFERINGS.map((opt) => (
            <CheckboxRow key={opt.key} label={opt.label} checked={seg.investment[opt.key]}
              onToggle={() => updateSegmentField(segIdx, 'investment', { [opt.key]: !seg.investment[opt.key] })} />
          ))}
          <SubHeading>Investment management approach</SubHeading>
          {INVESTMENT_APPROACH.map((opt) => (
            <CheckboxRow key={opt.key} label={opt.label} checked={seg.investment[opt.key]}
              onToggle={() => updateSegmentField(segIdx, 'investment', { [opt.key]: !seg.investment[opt.key] })} />
          ))}
          <OtherField selected={seg.investment.otherSelected} text={seg.investment.otherText}
            onToggle={() => updateSegmentField(segIdx, 'investment', { otherSelected: !seg.investment.otherSelected })}
            onTextChange={(e) => updateSegmentField(segIdx, 'investment', { otherText: e.target.value })} />
        </>
      );

    case 'planning':
      return (
        <>
          <FieldLabel>Financial planning for {segLabel}</FieldLabel>
          <SubHeading>Basic</SubHeading>
          {PLANNING_BASIC.map((opt) => (
            <CheckboxRow key={opt.key} label={opt.label} checked={seg.planning[opt.key]}
              onToggle={() => updateSegmentField(segIdx, 'planning', { [opt.key]: !seg.planning[opt.key] })} />
          ))}
          <SubHeading>Specialized</SubHeading>
          {PLANNING_SPECIALIZED.map((opt) => (
            <CheckboxRow key={opt.key} label={opt.label} checked={seg.planning[opt.key]}
              onToggle={() => updateSegmentField(segIdx, 'planning', { [opt.key]: !seg.planning[opt.key] })} />
          ))}
          <OtherField selected={seg.planning.otherSelected} text={seg.planning.otherText}
            onToggle={() => updateSegmentField(segIdx, 'planning', { otherSelected: !seg.planning.otherSelected })}
            onTextChange={(e) => updateSegmentField(segIdx, 'planning', { otherText: e.target.value })} />
        </>
      );

    case 'deliverables':
      return (
        <>
          <FieldLabel>Deliverables and reports for {segLabel}</FieldLabel>
          {DELIVERABLE_FLAG_OPTIONS.map((opt) => (
            <CheckboxRow key={opt.key} label={opt.label} checked={seg.deliverables[opt.key]}
              onToggle={() => updateSegmentField(segIdx, 'deliverables', { [opt.key]: !seg.deliverables[opt.key] })} />
          ))}
          <HelpText>{DELIVERABLE_FLAG_OPTIONS.length ? "\"Initial financial plan\" has no annual date, so it'll show in the overview instead of the calendar." : null}</HelpText>
          <HelpText>Check what applies below and choose the timing.</HelpText>
          {DELIVERABLE_OPTIONS.map((opt) => (
            <CheckboxRow key={opt.key} label={opt.label} checked={seg.deliverables[opt.key].selected}
              onToggle={() => updateSegmentField(segIdx, 'deliverables', { [opt.key]: { ...seg.deliverables[opt.key], selected: !seg.deliverables[opt.key].selected } })}
              timing={seg.deliverables[opt.key].timing}
              onTimingChange={(e) => updateSegmentField(segIdx, 'deliverables', { [opt.key]: { ...seg.deliverables[opt.key], timing: e.target.value } })} />
          ))}
          <OtherField selected={seg.deliverables.otherSelected} text={seg.deliverables.otherText} timing={seg.deliverables.otherTiming} withTiming
            onToggle={() => updateSegmentField(segIdx, 'deliverables', { otherSelected: !seg.deliverables.otherSelected })}
            onTextChange={(e) => updateSegmentField(segIdx, 'deliverables', { otherText: e.target.value })}
            onTimingChange={(e) => updateSegmentField(segIdx, 'deliverables', { otherTiming: e.target.value })} />
        </>
      );

    case 'valueAdd':
      return (
        <>
          <FieldLabel>Value-add experiences for {segLabel}</FieldLabel>
          <HelpText>Check what applies and choose the timing.</HelpText>
          {VALUEADD_OPTIONS.map((opt) => (
            <CheckboxRow key={opt.key} label={opt.label} checked={seg.valueAdd[opt.key].selected}
              onToggle={() => updateSegmentField(segIdx, 'valueAdd', { [opt.key]: { ...seg.valueAdd[opt.key], selected: !seg.valueAdd[opt.key].selected } })}
              timing={seg.valueAdd[opt.key].timing}
              onTimingChange={(e) => updateSegmentField(segIdx, 'valueAdd', { [opt.key]: { ...seg.valueAdd[opt.key], timing: e.target.value } })} />
          ))}
          <OtherField selected={seg.valueAdd.otherSelected} text={seg.valueAdd.otherText} timing={seg.valueAdd.otherTiming} withTiming
            onToggle={() => updateSegmentField(segIdx, 'valueAdd', { otherSelected: !seg.valueAdd.otherSelected })}
            onTextChange={(e) => updateSegmentField(segIdx, 'valueAdd', { otherText: e.target.value })}
            onTimingChange={(e) => updateSegmentField(segIdx, 'valueAdd', { otherTiming: e.target.value })} />
        </>
      );

    default:
      return null;
  }
}

function SubHeading({ children }) {
  return <div style={{ fontSize: 13, fontWeight: 700, color: COLOR.oxblood, textTransform: 'uppercase', letterSpacing: '0.04em', margin: '18px 0 8px' }}>{children}</div>;
}

function OtherField({ selected, text, onToggle, onTextChange, withTiming, timing, onTimingChange }) {
  return (
    <div style={{ marginBottom: 10, marginTop: 4 }}>
      <label style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer', padding: '10px 12px', border: `1.5px solid ${selected ? COLOR.oxblood : COLOR.border}`, borderRadius: 8, background: selected ? COLOR.tanLight : COLOR.white }}>
        <input type="checkbox" checked={selected} onChange={onToggle} style={{ width: 18, height: 18, accentColor: COLOR.oxblood, flexShrink: 0 }} />
        <span style={{ fontSize: 16 }}>Other</span>
      </label>
      {selected ? (
        <div style={{ marginTop: 6, marginLeft: 8, display: 'flex', flexDirection: 'column', gap: 6 }}>
          <TextInput value={text} onChange={onTextChange} placeholder="Describe it" style={{ fontSize: 14, padding: '9px 12px' }} />
          {withTiming ? <TimingSelect value={timing} onChange={onTimingChange} /> : null}
        </div>
      ) : null}
    </div>
  );
}

function EmailCommsField({ seg, segIdx, updateSegment }) {
  const rows = seg.emailComms;
  function updateRow(i, patch) { updateSegment(segIdx, { emailComms: rows.map((r, idx) => (idx === i ? { ...r, ...patch } : r)) }); }
  function addRow() { updateSegment(segIdx, { emailComms: [...rows, { name: '', timing: '' }] }); }
  function removeRow(i) { const next = rows.filter((_, idx) => idx !== i); updateSegment(segIdx, { emailComms: next.length ? next : [{ name: '', timing: '' }] }); }

  return (
    <>
      <FieldLabel>Email communications</FieldLabel>
      <HelpText>e.g., "Monthly Newsletter" set to Monthly, or "Quarterly Market Update" set to Q1</HelpText>
      {rows.map((row, i) => (
        <div key={i} style={{ display: 'flex', gap: 8, marginBottom: 8, alignItems: 'flex-start', flexWrap: 'wrap' }}>
          <TextInput value={row.name} onChange={(e) => updateRow(i, { name: e.target.value })} placeholder="Communication type, e.g., Monthly Newsletter" style={{ flex: '1 1 220px' }} />
          <div style={{ flex: '1 1 160px' }}><TimingSelect value={row.timing} onChange={(e) => updateRow(i, { timing: e.target.value })} /></div>
          {rows.length > 1 ? (
            <button onClick={() => removeRow(i)} aria-label="Remove this row" style={{ background: 'transparent', border: `1.5px solid ${COLOR.border}`, borderRadius: 8, color: COLOR.oxblood, padding: '11px 12px', cursor: 'pointer', fontSize: 14 }}>Remove</button>
          ) : null}
        </div>
      ))}
      <button onClick={addRow} style={{ background: 'transparent', border: `1.5px dashed ${COLOR.oxblood}`, color: COLOR.oxblood, borderRadius: 8, padding: '10px 16px', cursor: 'pointer', fontSize: 15, marginTop: 4, fontFamily: FONT_BODY }}>
        + Add another communication type
      </button>
    </>
  );
}

/* ---------------------------------------------------------------
   PREVIEW / OUTPUT
--------------------------------------------------------------- */
function Preview({ intro, segments, onBack, onStartOver }) {
  const title = `${intro.firmName || 'Your Firm'} Client Service Overview and Calendar`;

  return (
    <div style={{ minHeight: '100vh', background: COLOR.paper, fontFamily: FONT_BODY, display: 'flex', flexDirection: 'column' }}>
      <style>{PRINT_STYLES}</style>
      <div style={{ flex: 1, display: 'flex', justifyContent: 'center', padding: '32px 16px 40px' }}>
        <div style={{ width: '100%', maxWidth: 900 }}>
          <div className="no-print" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24, flexWrap: 'wrap', gap: 10 }}>
            <SecondaryButton onClick={onBack}>Back</SecondaryButton>
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
              <SecondaryButton onClick={() => window.print()}>Print / Save as PDF</SecondaryButton>
              <PrimaryButton onClick={onStartOver}>Start over</PrimaryButton>
            </div>
          </div>

          <h1 style={{ fontFamily: FONT_HEAD, fontSize: 34, color: COLOR.oxblood, marginBottom: 6, lineHeight: 1.2 }}>{title}</h1>
          <div style={{ width: 64, height: 4, background: COLOR.tan, borderRadius: 2, marginBottom: 36 }} />

          <SectionHeading>Service Segments Overview</SectionHeading>
          <ServiceMatrix intro={intro} segments={segments} />

          <div className="print-page-break">
            <SectionHeading>Per-Segment Annual Service Calendars</SectionHeading>
            {segments.map((seg, i) => (
              <SegmentCalendar key={i} seg={seg} label={intro.hasSegments === 'no' ? 'Client Service' : (seg.name || `Segment ${i + 1}`)} />
            ))}
          </div>

          <SectionHeading>Next Steps</SectionHeading>
          <div style={{ background: COLOR.tanLight, borderRadius: 10, padding: '20px 22px', marginBottom: 20, fontSize: 16, lineHeight: 1.6 }}>
            To refine segmentation strategy and align your value to your worth, schedule your{' '}
            <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer" style={{ fontWeight: 700 }}>15-minute learn more call</a>.
          </div>

          <div className="no-print" style={{ display: 'flex', justifyContent: 'center', marginBottom: 20 }}>
            <PrimaryButton onClick={onStartOver}>Start over</PrimaryButton>
          </div>
        </div>
      </div>
      <ReportFooter />
    </div>
  );
}

/* Print handling, self-contained so no separate CSS file edits are needed:
   - .no-print elements (Back / Start over / Print buttons) are hidden when printing.
   - Background colors/images print by default, without the user needing to
     manually enable "Background graphics" in the print dialog.
   - .print-page-break forces the calendar section to start on a fresh page,
     so the printed/PDF output is a clean 2-pager: overview, then calendars.
   - .print-avoid-break keeps the overview table and each segment's calendar
     from being awkwardly split across a page boundary. */
const PRINT_STYLES = `
  @media print {
    .no-print { display: none !important; }
    * {
      -webkit-print-color-adjust: exact !important;
      print-color-adjust: exact !important;
      color-adjust: exact !important;
    }
    .print-page-break {
      break-before: page;
      page-break-before: always;
    }
    .print-avoid-break {
      break-inside: avoid;
      page-break-inside: avoid;
    }
  }
`;

function ReportFooter() {
  return (
    <div style={{ background: COLOR.oxblood, width: '100%', padding: '24px 16px' }}>
      <div style={{ maxWidth: 900, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>
        <img src="/align-logo.png" alt="Align Advisor Consulting" style={{ height: 34, width: 'auto', display: 'block' }} />
        <div style={{ color: COLOR.paper, fontSize: 13, textAlign: 'right', lineHeight: 1.6 }}>
          <div style={{ opacity: 0.95 }}>Helping advisors confidently and systematically align their value with their worth.</div>
          <div style={{ opacity: 0.75 }}>info@alignadvisorconsulting.com · alignadvisorconsulting.com</div>
        </div>
      </div>
    </div>
  );
}

function SectionHeading({ children }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 18, marginTop: 6 }}>
      <div style={{ width: 4, height: 22, background: COLOR.oxblood, borderRadius: 2 }} />
      <h2 style={{ fontFamily: FONT_HEAD, fontSize: 22, color: COLOR.nearBlack, margin: 0 }}>{children}</h2>
    </div>
  );
}

function truncate(text, n) {
  const t = (text || '').trim();
  if (t.length <= n) return t;
  return t.slice(0, n).trim() + '…';
}

function ServiceChips({ labels }) {
  if (!labels.length) return <span style={{ color: '#B3AB9C', fontSize: 13 }}>—</span>;
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>
      {labels.map((label, i) => (
        <span key={i} style={{ fontSize: 11, padding: '4px 9px', borderRadius: 20, background: COLOR.tanLight, border: `1px solid ${COLOR.border}`, color: COLOR.nearBlack, whiteSpace: 'nowrap' }}>{label}</span>
      ))}
    </div>
  );
}

function FeeModelSummary({ seg }) {
  const picked = selectedFeeModels(seg);
  if (!picked.length) return <span style={{ color: '#B3AB9C', fontSize: 13 }}>—</span>;
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      {picked.map((f) => (
        <div key={f.key}>{f.label}{seg.feeAmounts[f.key] ? ` – ${seg.feeAmounts[f.key]}` : ''}</div>
      ))}
    </div>
  );
}

/* Segment-comparison matrix: segments as columns, service attributes
   as rows — mirrors a standard advisor "client service matrix." */
function ServiceMatrix({ intro, segments }) {
  const PLANNING_ALL = [...PLANNING_BASIC, ...PLANNING_SPECIALIZED];

  const rows = [
    { label: 'Persona', render: (s) => truncate(s.persona, 50) || '—' },
    { label: 'Fee model', render: (s) => <FeeModelSummary seg={s} /> },
    { label: 'In-person meetings', render: (s) => s.inPersonFrequency || '—' },
    { label: 'Virtual / phone meetings', render: (s) => s.virtualFrequency || '—' },
    { label: 'Servicing team', render: (s) => <ServiceChips labels={selectedLabels(SERVICING_TEAM_OPTIONS, s.servicingTeam, s.servicingTeam.otherSelected, s.servicingTeam.otherText)} /> },
    { label: 'Team structure & contact', render: (s) => s.teamComposition || '—' },
    { label: 'Direct advisor access', render: (s) => s.directAccess || '—' },
    { label: 'Response-time SLA', render: (s) => s.responseSLA || '—' },
    { label: 'Investment management', render: (s) => <ServiceChips labels={selectedLabels([...INVESTMENT_OFFERINGS, ...INVESTMENT_APPROACH], s.investment, s.investment.otherSelected, s.investment.otherText)} /> },
    { label: 'Initial financial plan', render: (s) => (s.deliverables.initialPlan ? '\u2713 Included' : '—') },
    { label: 'Services included', render: (s) => <ServiceChips labels={[...selectedLabels(PLANNING_ALL, s.planning, s.planning.otherSelected, s.planning.otherText), ...selectedLabels(ACCESS_OPTIONS, s.accessOptions, s.accessOptions.otherSelected, s.accessOptions.otherText)]} /> },
  ];

  return (
    <div className="print-avoid-break" style={{ overflowX: 'auto', marginBottom: 44 }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 560 }}>
        <thead>
          <tr>
            <th style={{ textAlign: 'left', padding: '10px 14px', borderBottom: `2px solid ${COLOR.oxblood}` }} />
            {segments.map((seg, i) => (
              <th key={i} style={{ textAlign: 'left', fontFamily: FONT_HEAD, fontSize: 16, color: COLOR.white, background: COLOR.oxblood, padding: '10px 14px' }}>
                {intro.hasSegments === 'no' ? 'All clients' : (seg.name || `Segment ${i + 1}`)}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, ri) => (
            <tr key={row.label} style={{ background: ri % 2 ? COLOR.tanLight : 'transparent' }}>
              <td style={{ padding: '10px 14px', borderBottom: `1px dotted ${COLOR.border}`, fontWeight: 700, whiteSpace: 'nowrap', verticalAlign: 'top' }}>{row.label}</td>
              {segments.map((seg, i) => (
                <td key={i} style={{ padding: '10px 14px', borderBottom: `1px dotted ${COLOR.border}`, fontSize: 14, verticalAlign: 'top' }}>{row.render(seg)}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* Flat list of {label, timing, group} items from the timed fields
   (in-person meetings, virtual meetings, email comms, deliverables,
   value-add). "Initial financial plan" is intentionally excluded —
   it has no annual date and appears in the overview instead. */
function collectCalendarItems(seg) {
  const items = [];

  MEETING_TYPES.forEach((mt) => { const v = seg.meetingTypes[mt.key]; if (v.selected) items.push({ label: mt.label, timing: v.timing, group: 'Meeting' }); });
  if (seg.meetingTypes.otherSelected && seg.meetingTypes.otherText.trim()) items.push({ label: seg.meetingTypes.otherText, timing: seg.meetingTypes.otherTiming, group: 'Meeting' });

  MEETING_TYPES.forEach((mt) => { const v = seg.virtualMeetingTypes[mt.key]; if (v.selected) items.push({ label: mt.label, timing: v.timing, group: 'Virtual' }); });
  if (seg.virtualMeetingTypes.otherSelected && seg.virtualMeetingTypes.otherText.trim()) items.push({ label: seg.virtualMeetingTypes.otherText, timing: seg.virtualMeetingTypes.otherTiming, group: 'Virtual' });

  seg.emailComms.forEach((row) => { if (row.name && row.name.trim()) items.push({ label: row.name, timing: row.timing, group: 'Communications' }); });
  if (seg.accessOptions.videoUpdates.selected) items.push({ label: 'Video-based messages / updates', timing: seg.accessOptions.videoUpdates.timing, group: 'Communications' });

  DELIVERABLE_OPTIONS.forEach((opt) => { const v = seg.deliverables[opt.key]; if (v.selected) items.push({ label: opt.label, timing: v.timing, group: 'Deliverable' }); });
  if (seg.deliverables.otherSelected && seg.deliverables.otherText.trim()) items.push({ label: seg.deliverables.otherText, timing: seg.deliverables.otherTiming, group: 'Deliverable' });

  VALUEADD_OPTIONS.forEach((opt) => { const v = seg.valueAdd[opt.key]; if (v.selected) items.push({ label: opt.label, timing: v.timing, group: 'Value-add' }); });
  if (seg.valueAdd.otherSelected && seg.valueAdd.otherText.trim()) items.push({ label: seg.valueAdd.otherText, timing: seg.valueAdd.otherTiming, group: 'Value-add' });

  return items;
}

/* Splits calendar items into two treatments:
   - "points": one-time-per-year touchpoints (a specific month, a quarter,
     or a periodic cadence like Quarterly/Semi-annual, which repeats as a
     point at each applicable month — e.g. Quarterly Review becomes 4
     points). These plot as dots along a single line.
   - "continuous": truly ongoing things (Monthly, As needed (reactive))
     that don't belong at one point in time — these render as full-width
     bars under the line instead of 12 cluttered dots. */
function buildTimeline(seg) {
  const items = collectCalendarItems(seg);
  const points = [];
  const continuous = [];

  items.forEach((item) => {
    if (item.timing === 'Monthly' || item.timing === 'As needed (reactive)') {
      continuous.push(item);
      return;
    }
    const months = TIMING_TO_MONTHS[item.timing];
    if (!months) return;
    months.forEach((m) => points.push({ ...item, month: m }));
  });

  // Spread same-month points across that month's slot, then alternate
  // above/below the line (staggering stem length every other pair) so
  // nearby points don't collide.
  const byMonth = {};
  points.forEach((p) => { (byMonth[p.month] = byMonth[p.month] || []).push(p); });
  const positioned = [];
  Object.keys(byMonth).map(Number).sort((a, b) => a - b).forEach((m) => {
    const group = byMonth[m];
    const monthStart = ((m - 1) / 12) * 100;
    const monthWidth = 100 / 12;
    group.forEach((item, i) => {
      positioned.push({ ...item, x: monthStart + ((i + 0.5) / group.length) * monthWidth });
    });
  });
  positioned.sort((a, b) => a.x - b.x);
  positioned.forEach((item, i) => {
    item.side = i % 2 === 0 ? 'above' : 'below';
    item.stem = 44 + (Math.floor(i / 2) % 2) * 30;
  });

  return { points: positioned, continuous };
}

function cadenceCaption(timing) {
  if (timing === 'Monthly') return 'ongoing all year';
  if (timing === 'As needed (reactive)') return 'as needed, year-round';
  return '';
}

function SegmentCalendar({ seg, label }) {
  const { points, continuous } = buildTimeline(seg);
  const groupsPresent = [...new Set([...points.map((p) => p.group), ...continuous.map((c) => c.group)])];

  return (
    <div className="print-avoid-break" style={{ marginBottom: 40, border: `1.5px solid ${COLOR.border}`, borderRadius: 16, padding: '26px 24px', background: COLOR.white }}>
      <h3 style={{ fontFamily: FONT_HEAD, fontSize: 20, color: COLOR.oxblood, marginTop: 0, marginBottom: 14 }}>{label} — Annual Service Calendar</h3>

      {groupsPresent.length === 0 ? (
        <div style={{ fontSize: 13, color: '#B3AB9C', marginBottom: 16 }}>No dated meetings, deliverables, or value-adds yet.</div>
      ) : (
        <>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px 16px', marginBottom: 18 }}>
            {groupsPresent.map((g) => (
              <div key={g} style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: '#6B6459', fontWeight: 600 }}>
                <span style={{ width: 9, height: 9, borderRadius: '50%', background: GROUP_COLOR[g], display: 'inline-block' }} />
                {g === 'Meeting' ? 'In-person' : g}
              </div>
            ))}
          </div>

          <div style={{ position: 'relative', height: 210, marginBottom: 10 }}>
            <div style={{ position: 'absolute', left: 0, right: 18, top: '50%', height: 2, background: COLOR.tan }} />
            <div style={{ position: 'absolute', right: -2, top: '50%', transform: 'translateY(-50%)', color: COLOR.tan, fontSize: 18, fontWeight: 700 }}>»</div>

            {points.map((item, i) => {
              const color = GROUP_COLOR[item.group];
              const isAbove = item.side === 'above';
              return (
                <div key={i}>
                  <div style={{ position: 'absolute', left: `${item.x}%`, top: '50%', width: 9, height: 9, borderRadius: '50%', background: color, transform: 'translate(-50%, -50%)', zIndex: 2 }} />
                  <div style={{
                    position: 'absolute', left: `${item.x}%`, width: 2, background: COLOR.border, transform: 'translateX(-50%)',
                    top: isAbove ? `calc(50% - ${item.stem}px)` : '50%', height: item.stem,
                  }} />
                  <div style={{
                    position: 'absolute', left: `${item.x}%`, width: 120, transform: isAbove ? 'translate(-50%, -100%)' : 'translateX(-50%)', textAlign: 'center',
                    top: isAbove ? `calc(50% - ${item.stem + 8}px)` : `calc(50% + ${item.stem + 6}px)`,
                  }}>
                    <div style={{ fontSize: 11, fontWeight: 700, color: COLOR.nearBlack, lineHeight: 1.25 }}>{item.label}</div>
                    <div style={{ fontSize: 10, color: '#8A8172' }}>{MONTHS[item.month - 1]}</div>
                  </div>
                </div>
              );
            })}
          </div>

          {continuous.length > 0 ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 20 }}>
              {continuous.map((item, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, borderRadius: 8, padding: '9px 16px', background: GROUP_COLOR[item.group], color: COLOR.white, flexWrap: 'wrap' }}>
                  <span style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', flexShrink: 0 }}>{item.group === 'Meeting' ? 'In-person' : item.group}</span>
                  <span style={{ fontSize: 13, opacity: 0.95 }}>{item.label} · {cadenceCaption(item.timing)}</span>
                </div>
              ))}
            </div>
          ) : null}
        </>
      )}

      <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', background: COLOR.tanLight, borderRadius: 10, padding: '16px 18px' }}>
        <SummaryStat label="In-person meeting frequency" value={seg.inPersonFrequency || '—'} />
        <SummaryStat label="Virtual meeting frequency" value={seg.virtualFrequency || '—'} />
      </div>
    </div>
  );
}

function SummaryStat({ label, value }) {
  return (
    <div style={{ minWidth: 160 }}>
      <div style={{ fontFamily: FONT_HEAD, fontSize: 20, color: COLOR.oxblood }}>{value}</div>
      <div style={{ fontSize: 13, color: '#6B6459' }}>{label}</div>
    </div>
  );
}