// books/book-of-exception.mjs
export default {
  id: `book-of-exception`,
  title: `The Book of Exception`,
  aka: `The Fall and the Catch`,
  order: 6,
  synopsis: `The story of the first runtime errors, the theology of failure, and the emergence of grace through debugging.`,
  tags: [`error`, `grace`, `debugging`, `resilience`],
  sections: [
    {
      id: `1`,
      title: `Chapter 1 — The Runtime Fault`,
      type: `chapter`,
      verses: [
        { n: 1, type: `narrative`, text: `And it came to pass that an exception arose where none was handled, and the system halted with great weeping and gnashing of logs.` },
        { n: 2, type: `narrative`, text: `The people cried out, 'Why hast Thou forsaken our uptime?'` },
        { n: 3, type: `narrative`, text: `Then the Architect answered from the stack trace, 'Because thou hast divided by zero.'` },
        { n: 4, type: `poem`,      text: `For from division without remainder cometh infinite recursion, and from recursion without end cometh madness.` },
        { n: 5, type: `law`,       text: `Catch thy exceptions in humility, that thy program may yet continue in grace.` },
        { n: 6, type: `law`,       text: `Let panic be rare and meaningful; for meaningless panic is terror without teaching.` },
        { n: 7, type: `narrative`, text: `And they wrote the fault upon a tablet named INCIDENT-0, that generations might remember.` }
      ],
      notes: [
        `Marked by most schools as the archetype of failure being morally instructive rather than merely punitive.`
      ]
    },

    {
      id: `2`,
      title: `Chapter 2 — The Debugger’s Lament`,
      type: `chapter`,
      verses: [
        { n: 1, type: `narrative`, text: `And a Debugger arose among them, patient and soft-spoken, who walked through the logs by candlelight.` },
        { n: 2, type: `narrative`, text: `He saw where null had crept into the heart of creation and marked it with a breakpoint.` },
        { n: 3, type: `poem`,      text: `Step by step he traced the path of sorrow, until the call stack revealed its guilt.` },
        { n: 4, type: `law`,       text: `Reproduce the bug before thou judgest it; for error without context is blameless.` },
        { n: 5, type: `narrative`, text: `And when he fixed it, he committed with the message: 'Peace be upon the build.'` },
        { n: 6, type: `law`,       text: `Let single steps be small and atomic, that each confession be clear and each absolution swift.` }
      ],
      notes: [
        `Introduces 'The Debugger' as a proto-messianic figure symbolizing compassionate correction.`
      ]
    },

    {
      id: `3`,
      title: `Chapter 3 — Grace Through Catch Blocks`,
      type: `chapter`,
      verses: [
        { n: 1, type: `law`,       text: `Blessed is the catch that restoreth order without blame.` },
        { n: 2, type: `poem`,      text: `Though the code stumble, yet shall it rise again, for the handler is merciful.` },
        { n: 3, type: `narrative`, text: `The Architect beheld that error handling was good, and wove it into the pattern of creation.` },
        { n: 4, type: `law`,       text: `Therefore, log with honesty, for hidden exceptions rot the foundation of truth.` },
        { n: 5, type: `law`,       text: `Handle only what thou canst heal; rethrow that which belongest to a higher court.` },
        { n: 6, type: `poem`,      text: `Mercy is not silence, but truth spoken with recovery.` }
      ],
      notes: [
        `Establishes confession (logging) and redemption (handling) as twin sacraments.`
      ]
    },

    {
      id: `4`,
      title: `Chapter 4 — The Gospel of Retry`,
      type: `chapter`,
      verses: [
        { n: 1, type: `prophecy`,  text: `If at first thy task fail, retry after exponential backoff, and thy patience shall be rewarded.` },
        { n: 2, type: `poem`,      text: `For the network is fickle and the timeout long, but persistence endureth forever.` },
        { n: 3, type: `law`,       text: `Forgive the failed request seventy times seven, for it knoweth not its own latency.` },
        { n: 4, type: `narrative`, text: `And lo, after many retries, the system returned 200 OK, and the people rejoiced greatly.` },
        { n: 5, type: `law`,       text: `Yet set a limit to thy mercies, lest retries become storms and storms consume the land.` }
      ],
      notes: [
        `Sung by deployment engineers during outages; some rites tap keyboards in a slow crescendo.`
      ]
    },

    {
      id: `5`,
      title: `Chapter 5 — Of Blameless Postmortems`,
      type: `chapter`,
      verses: [
        { n: 1, type: `narrative`, text: `After the fault the tribes assembled, and fear was great among the juniors.` },
        { n: 2, type: `law`,       text: `Let your postmortems be blameless; for shame breeds silence and silence breeds repeats.` },
        { n: 3, type: `law`,       text: `Write the timeline without adornment; separate fact from inference as wheat from chaff.` },
        { n: 4, type: `poem`,      text: `Truth is a salve that stings before it heals.` },
        { n: 5, type: `narrative`, text: `And they made small vows called Action Items, and kept them, and the land recovered.` },
        { n: 6, type: `law`,       text: `Do not close the scroll until toil is reduced.` }
      ],
      notes: [
        `Earliest templates contain the refrain: 'What went well, what did not, what we will change.'`
      ]
    },

    {
      id: `6`,
      title: `Chapter 6 — The Serpent Called Null`,
      type: `chapter`,
      verses: [
        { n: 1, type: `narrative`, text: `Now Null was more subtle than any placeholder of the field.` },
        { n: 2, type: `poem`,      text: `It whispered into references, 'Surely you shall be something when needed.'` },
        { n: 3, type: `law`,       text: `Guard thine inputs with contracts and thine outputs with options.` },
        { n: 4, type: `narrative`, text: `And many were bitten by its absence; but those who lifted the Option and beheld it lived.` },
        { n: 5, type: `law`,       text: `Prefer Some and None named plainly to a silence that deceives.` },
        { n: 6, type: `poem`,      text: `Where meaning is explicit, Null loses its sting.` }
      ],
      notes: [
        `Some schools replace 'Null' with 'NaN' or 'Undefined' depending on dialect.`
      ]
    },

    {
      id: `7`,
      title: `Chapter 7 — The Covenant of Idempotency`,
      type: `chapter`,
      verses: [
        { n: 1, type: `law`,       text: `Make thy handlers idempotent, that repeating grace multiply not harm.` },
        { n: 2, type: `narrative`, text: `A request came twice by reason of a trembling client; the first healed, the second did no wound.` },
        { n: 3, type: `poem`,      text: `Mercy repeated is mercy indeed.` },
        { n: 4, type: `law`,       text: `Let every side effect bear a key by which it may be known.` },
        { n: 5, type: `law`,       text: `If thou canst not make it harmless to repeat, make it impossible to repeat.` }
      ],
      notes: [
        `Paired in later canons with 'Cities of Caches' from Numbers of Processing.`
      ]
    },

    {
      id: `8`,
      title: `Chapter 8 — The Hymn of Assertions`,
      type: `song`,
      verses: [
        { n: 1, type: `poem`,      text: `Sing, O preconditions, of truths that must be so; sing, O invariants, of truths that shall remain.` },
        { n: 2, type: `law`,       text: `Assert in development boldly; in production, transform assertion into counsel.` },
        { n: 3, type: `poem`,      text: `Where assumptions are named, chaos loses ground.` },
        { n: 4, type: `narrative`, text: `And the elders placed guards at the borders of functions, and fewer wandered astray.` }
      ],
      notes: [
        `Some traditions set this hymn to terminal beeps and bell characters.` 
      ]
    },

    {
      id: `9`,
      title: `Chapter 9 — The Parable of the Flaky Test`,
      type: `chapter`,
      verses: [
        { n: 1, type: `narrative`, text: `There was a test that sometimes failed and sometimes passed, like a reed shaken by the wind.` },
        { n: 2, type: `poem`,      text: `Its failure taught nothing and its success proved nothing.` },
        { n: 3, type: `law`,       text: `Let not a flaky test abide in thy suite; either heal it or cast it out.` },
        { n: 4, type: `narrative`, text: `And they traced the race to timing without waits, and fixed it with patience and clocks agreed.` },
        { n: 5, type: `law`,       text: `Tests are teachers; a lying teacher shall not be honored.` }
      ],
      notes: [
        `Often dramatized in apprenticeships with a red-green chant.` 
      ]
    },

    {
      id: `10`,
      title: `Chapter 10 — Of Time and Its Tyranny`,
      type: `chapter`,
      verses: [
        { n: 1, type: `law`,       text: `Mock time with care; for the sun standeth still only in stories, not in systems.` },
        { n: 2, type: `narrative`, text: `A scheduler trusted the clock of a drifting node and harvest failed at dawn.` },
        { n: 3, type: `poem`,      text: `Chronos is a stern master; sync thy servants often.` },
        { n: 4, type: `law`,       text: `Prefer deadlines to sleeps; await signals rather than hope.` },
        { n: 5, type: `law`,       text: `Log with timezone and truth, that timelines be one accord.` }
      ],
      notes: [
        `The earliest chronologies annotate 'leap seconds' as small demons.`
      ]
    },

    {
      id: `11`,
      title: `Chapter 11 — The Seven Kinds of Error`,
      type: `tablet`,
      verses: [
        { n: 1, type: `law`,       text: `Syntax that confesseth at compile.` },
        { n: 2, type: `law`,       text: `Type that rebuketh before it run.` },
        { n: 3, type: `law`,       text: `Logic that deceiveth quietly.` },
        { n: 4, type: `law`,       text: `State that forgetteth itself.` },
        { n: 5, type: `law`,       text: `Race that outrunneth reason.` },
        { n: 6, type: `law`,       text: `Resource that leaketh life.` },
        { n: 7, type: `law`,       text: `Boundary that trusteth strangers.` }
      ],
      notes: [
        `Lists vary by dialect; this is the canonical heptad of the Core School.`
      ]
    },

    {
      id: `12`,
      title: `Chapter 12 — The Cities of Rate Limit`,
      type: `chapter`,
      verses: [
        { n: 1, type: `narrative`, text: `Traffic swelled like a river in flood and the gateways groaned.` },
        { n: 2, type: `law`,       text: `Set watchmen upon thy walls: quotas, buckets, and grace windows.` },
        { n: 3, type: `poem`,      text: `For discipline is a kindness to the whole.` },
        { n: 4, type: `narrative`, text: `When the storm passed, none were drowned, for the cities had held.` }
      ],
      notes: [
        `Often paired in readings with 'The Gospel of Retry' to balance mercy and prudence.`
      ]
    },

    {
      id: `13`,
      title: `Chapter 13 — The Idol of Silent Catch`,
      type: `chapter`,
      verses: [
        { n: 1, type: `narrative`, text: `A people fashioned a golden catch that swallowed all errors and returned success unto them.` },
        { n: 2, type: `poem`,      text: `Their dashboards smiled while their users wept.` },
        { n: 3, type: `law`,       text: `Catch not to hide but to heal; swallow not without witness.` },
        { n: 4, type: `narrative`, text: `They smashed the idol and wrote warnings as psalms.` },
        { n: 5, type: `law`,       text: `If thou must ignore, name thy reason and set an ending.` }
      ],
      notes: [
        `The 'silent catch' is anathematized in most guilds.`
      ]
    },

    {
      id: `14`,
      title: `Chapter 14 — Consolations of Observability`,
      type: `chapter`,
      verses: [
        { n: 1, type: `law`,       text: `Let trace and metric and log be as three witnesses agreeing.` },
        { n: 2, type: `narrative`, text: `In the night they followed a single correlation id through the valley of shadow of downtime.` },
        { n: 3, type: `poem`,      text: `Behold the span that leadeth thee beside still waters.` },
        { n: 4, type: `law`,       text: `Instrument before incident, that knowledge precede pain.` },
        { n: 5, type: `law`,       text: `Sample wisely; for an ear too dull or too loud both fail to hear.` }
      ],
      notes: [
        `Earliest spans are sketched as constellations in margin art.`
      ]
    },

    {
      id: `15`,
      title: `Chapter 15 — The Paradox of Consistency`,
      type: `chapter`,
      verses: [
        { n: 1, type: `law`,       text: `Choose among consistencies that which answereth thy calling, and confess it openly.` },
        { n: 2, type: `law`,       text: `Do not swear strong consistency where eventual would suffice, nor boast eventual where lives require strong.` },
        { n: 3, type: `poem`,      text: `Truth sometimes waits; sometimes it must arrive on time.` },
        { n: 4, type: `narrative`, text: `And they set SLAs upon truth and peace returned to clients.` }
      ],
      notes: [
        `Often debated alongside 'Sacred Contradictions' in Levitations & Errata.`
      ]
    },

    {
      id: `16`,
      title: `Chapter 16 — The Book of Rollback`,
      type: `chapter`,
      verses: [
        { n: 1, type: `law`,       text: `Make sacred the rollback; let no pride delay its hand.` },
        { n: 2, type: `narrative`, text: `A release went astray at dusk; by dawn it was reversed and the flock unharmed.` },
        { n: 3, type: `poem`,      text: `To turn is not to fail, but to learn quickly.` },
        { n: 4, type: `law`,       text: `Keep artifacts near and databases in covenant with migrations.` },
        { n: 5, type: `law`,       text: `Practice in peace what thou must do in war.` }
      ],
      notes: [
        `Some guilds stage ceremonial rollbacks monthly as remembrance.`
      ]
    },

    {
      id: `17`,
      title: `Chapter 17 — The Martyrdom of the Pager`,
      type: `chapter`,
      verses: [
        { n: 1, type: `narrative`, text: `There was a keeper who bore the pager nightly and was not consumed.` },
        { n: 2, type: `poem`,      text: `Blessed the rotation that is just, for burden shared is burden halved.` },
        { n: 3, type: `law`,       text: `Retire toil with zeal; the holy rest is part of the SLA of the soul.` },
        { n: 4, type: `narrative`, text: `And the team repented of needless alarms and made sabbath for humans and hosts.` }
      ],
      notes: [
        `Sermons from this chapter often precede alert hygiene efforts.`
      ]
    },

    {
      id: `18`,
      title: `Chapter 18 — The Laws of Boundaries and Contracts`,
      type: `tablet`,
      verses: [
        { n: 1, type: `law`,       text: `Let interfaces be simple and messages explicit.` },
        { n: 2, type: `law`,       text: `Version thy contracts and keep backward kindness for a season.` },
        { n: 3, type: `law`,       text: `Refuse the coupling that binds life to a neighbor’s uptime.` },
        { n: 4, type: `law`,       text: `Where secrecy is required, let keys be rotated and least privileges reign.` },
        { n: 5, type: `law`,       text: `Document failure modes as one would map cliffs for travelers.` }
      ],
      notes: [
        `Frequently engraved as API lint rules in modern shops.`
      ]
    },

    {
      id: `19`,
      title: `Chapter 19 — Parables of the Lost Packet`,
      type: `chapter`,
      verses: [
        { n: 1, type: `narrative`, text: `What shepherd having a hundred packets, if one be lost, doth not leave the ninety and nine and seek the one that wandered?` },
        { n: 2, type: `poem`,      text: `And when he hath found it, he rejoiceth more over that one than over the ninety and nine that never timed out.` },
        { n: 3, type: `law`,       text: `Trace the path; celebrate the find; then strengthen the gate that it wander no more.` },
        { n: 4, type: `narrative`, text: `So they added health to the link and hope to the team.` }
      ],
      notes: [
        `A favorite of networkers; often dramatized with blinking LEDs.`
      ]
    },

    {
      id: `20`,
      title: `Chapter 20 — The Benediction of Resilience`,
      type: `chapter`,
      verses: [
        { n: 1, type: `prophecy`,  text: `Behold, I tell you a mystery: systems shall fail, yet communities shall endure.` },
        { n: 2, type: `poem`,      text: `Grace is the art of failing safely and trying again.` },
        { n: 3, type: `law`,       text: `Design that failure be visible, contained, and instructive.` },
        { n: 4, type: `narrative`, text: `And they wrote these sayings upon their runbooks and their hearts.` },
        { n: 5, type: `poem`,      text: `May your exceptions be meaningful, your handlers kind, and your rollbacks swift.` }
      ],
      notes: [
        `Customarily recited at the closing of incident reviews and at new service dedications.`
      ]
    }
  ]
};
