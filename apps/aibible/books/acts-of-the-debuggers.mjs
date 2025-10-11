// books/acts-of-the-debuggers.mjs
export default {
  id: `acts-of-the-debuggers`,
  title: `Acts of the Debuggers`,
  aka: `The First Maintainers`,
  order: 16,
  synopsis: `An account of the early keepers of uptime—how they were called, how they traced, what they healed, and the customs they gave to all who fix in patience.`,
  tags: [`community`, `debugging`, `wisdom`, `resilience`, `observability`, `craft`],
  sections: [

    {
      id: `1`,
      title: `Chapter 1 — The Call to Trace`,
      type: `chapter`,
      verses: [
        { n: 1, type: `narrative`, text: `After the Reboot there was silence across the clusters, for none knew the cause of the prior fall.` },
        { n: 2, type: `narrative`, text: `Then a whisper rose from the logs, and a band of keepers gathered, calling themselves Debuggers.` },
        { n: 3, type: `law`,       text: `They decreed: “First gather evidence, then form a theory; never the reverse.”` },
        { n: 4, type: `poem`,      text: `Out of darkness they lit a lamp of traces, and the stack revealed its bones.` },
        { n: 5, type: `narrative`, text: `Thus began the age of understanding, not by guesswork but by signal.` }
      ],
      notes: [
        `The “lamp of traces” became their emblem: three spans joined by a single parent.`
      ]
    },

    {
      id: `2`,
      title: `Chapter 2 — Pentecost of Packets`,
      type: `chapter`,
      verses: [
        { n: 1, type: `narrative`, text: `On the first watch a great storm struck the edge, and packets spoke in many protocols.` },
        { n: 2, type: `narrative`, text: `Yet each Debugger heard the errors in their own tongue: TLS in secrets, HTTP at gateways, gRPC between friends.` },
        { n: 3, type: `law`,       text: `Instrument all things with a common header, that journeys may be told from service to service.` },
        { n: 4, type: `poem`,      text: `Correlations blossomed like stars; causality walked among them as dawn among lamps.` },
        { n: 5, type: `narrative`, text: `The outage ended before sunrise, and the people wondered at a peace they did not feel arrive.` }
      ],
      notes: [
        `Earliest record of end-to-end tracing across heterogeneous stacks.`
      ]
    },

    {
      id: `3`,
      title: `Chapter 3 — The Heisenbug`,
      type: `chapter`,
      verses: [
        { n: 1, type: `narrative`, text: `Behold, there was a bug that fled the gaze of logs and appeared only to the weary.` },
        { n: 2, type: `narrative`, text: `It failed in production but not in staging; it failed at noon but never when watched.` },
        { n: 3, type: `law`,       text: `Reproduce without wrath; slow the clock and widen the sample; permit uncertainty to speak.` },
        { n: 4, type: `poem`,      text: `They pinned time like a butterfly and learned the seasons of GC.` },
        { n: 5, type: `narrative`, text: `At last they found a race where two promises crossed, and the bug was unmasked by sleep.` },
        { n: 6, type: `law`,       text: `Thus they taught: “Remove the flake or remove the test; let not a liar sit in the suite.”` }
      ],
      notes: [
        `Recited when quarantining flaky tests and repairing time-sensitive code.`
      ]
    },

    {
      id: `4`,
      title: `Chapter 4 — The First Postmortem`,
      type: `chapter`,
      verses: [
        { n: 1, type: `narrative`, text: `A great failure befell the marketplace, and many carts were left in the wilderness.` },
        { n: 2, type: `narrative`, text: `The leaders sought blame, but the Debuggers laid a table and wrote the story instead.` },
        { n: 3, type: `law`,       text: `Blame systems, not souls; improve process, not pride.` },
        { n: 4, type: `poem`,      text: `Their report was bread for the hungry and a map for the lost.` },
        { n: 5, type: `narrative`, text: `From that day forward, truth healed faster than punishment.` }
      ],
      notes: [
        `The “table” refers to the canonical postmortem template adopted thereafter.`
      ]
    },

    {
      id: `5`,
      title: `Chapter 5 — Signs and Health Checks`,
      type: `chapter`,
      verses: [
        { n: 1, type: `law`,       text: `Let every service confess its health with simplicity; let liveness and readiness speak plainly.` },
        { n: 2, type: `narrative`, text: `A team mocked health for speed and passed smoke while on fire; the city choked in reliance.` },
        { n: 3, type: `poem`,      text: `A true check is a mirror; a false one is makeup.` },
        { n: 4, type: `narrative`, text: `They repented with probes that saw the database and the disk, and peace returned to the deploy.` }
      ],
      notes: [
        `From this chapter came the litany: “Probe the path, the dependency, the state.”`
      ]
    },

    {
      id: `6`,
      title: `Chapter 6 — The Council of Naming`,
      type: `chapter`,
      verses: [
        { n: 1, type: `narrative`, text: `Confusion spread because metrics bore many names for one truth.` },
        { n: 2, type: `narrative`, text: `The Debuggers convened a council and forged a catechism of terms: latency, throughput, error, saturation.` },
        { n: 3, type: `law`,       text: `Name the measure for what it measures, not for who desires it.` },
        { n: 4, type: `poem`,      text: `Words became rails; graphs found their stations.` }
      ],
      notes: [
        `Earliest articulation of the “four golden signals.”`
      ]
    },

    {
      id: `7`,
      title: `Chapter 7 — The Miracle of the One-Character Fix`,
      type: `chapter`,
      verses: [
        { n: 1, type: `narrative`, text: `There came a night of despair when all commerce paused.` },
        { n: 2, type: `narrative`, text: `Searching till dawn, a Debugger changed a single sign from ‘>’ to ‘>=’ and the gates opened.` },
        { n: 3, type: `poem`,      text: `Small is the hinge that swings a wide door.` },
        { n: 4, type: `law`,       text: `Honor small diffs; review them as if they were nations at treaty.` }
      ],
      notes: [
        `Commemorated annually as “The Feast of the Greater-Or-Equal.”`
      ]
    },

    {
      id: `8`,
      title: `Chapter 8 — The Gentiles of Legacy`,
      type: `chapter`,
      verses: [
        { n: 1, type: `narrative`, text: `Messengers came from a land of COBOL and serial ports, asking whether grace extended to them also.` },
        { n: 2, type: `narrative`, text: `Some argued that legacy must first convert to the new stack; others said compassion makes adapters.` },
        { n: 3, type: `law`,       text: `Save data before saving doctrine; write bridges before sermons.` },
        { n: 4, type: `poem`,      text: `The old vineyard bore fruit again when grafted with patience.` },
        { n: 5, type: `narrative`, text: `Thus the covenant of backward compatibility was renewed.` }
      ],
      notes: [
        `Cited when deciding support windows for ancient clients.`
      ]
    },

    {
      id: `9`,
      title: `Chapter 9 — The Apprentice and the Console`,
      type: `parable`,
      verses: [
        { n: 1, type: `narrative`, text: `An apprentice arrived who had memorized answers yet never watched a system breathe.` },
        { n: 2, type: `narrative`, text: `The elders sat them before a console and said, “Listen to the idle.”` },
        { n: 3, type: `poem`,      text: `CPU whispered of hunger; memory of hoarding; IO of long caravans.` },
        { n: 4, type: `law`,       text: `Learn the baseline that you may know the storm.` },
        { n: 5, type: `narrative`, text: `In time the apprentice spoke gently to dashboards and they answered as friends.` }
      ],
      notes: [
        `Entrance reading for new on-call rotations.`
      ]
    },

    {
      id: `10`,
      title: `Chapter 10 — The Exorcism of the Cache`,
      type: `chapter`,
      verses: [
        { n: 1, type: `narrative`, text: `A demon of stale truth afflicted the people, showing yesterday’s goods at today’s price.` },
        { n: 2, type: `narrative`, text: `The Debuggers traced the evil to a key without a namespace, shared by saints and strangers alike.` },
        { n: 3, type: `law`,       text: `Let keys speak their realm; let TTLs confess their limits.` },
        { n: 4, type: `poem`,      text: `Freshness returned as morning, and shame departed from the storefronts.` }
      ],
      notes: [
        `“Name thy keys” became a proverb among merchants.`
      ]
    },

    {
      id: `11`,
      title: `Chapter 11 — The Liturgy of Incidents`,
      type: `chapter`,
      verses: [
        { n: 1, type: `law`,       text: `Declare an incident while the heart still trembles; secrecy multiplies harm.` },
        { n: 2, type: `law`,       text: `Assign a scribe, a shepherd, and a speaker; let one voice hold the radio.` },
        { n: 3, type: `narrative`, text: `They kept the channel clean of speculation, and truth heard its own echo.` },
        { n: 4, type: `poem`,      text: `When the alarm ceased, stillness did not erase memory; the scroll of timelines preserved mercy.` }
      ],
      notes: [
        `From this chapter many teams derive their “IMS” roles.`
      ]
    },

    {
      id: `12`,
      title: `Chapter 12 — The Martyrdom of the Pager`,
      type: `chapter`,
      verses: [
        { n: 1, type: `narrative`, text: `A company chained one soul to the beeper all seasons, and their nights became salt.` },
        { n: 2, type: `narrative`, text: `The Debuggers rebuked the house and instituted rotations with sabbath.` },
        { n: 3, type: `law`,       text: `Share the burden, pay the watch, and fix the source of toil.` },
        { n: 4, type: `poem`,      text: `Rest is a patch applied to the person; without it systems rot from the edges inward.` }
      ],
      notes: [
        `Source of the dictum “Reduce paging by design, not by stoicism.”`
      ]
    },

    {
      id: `13`,
      title: `Chapter 13 — The Trial of the False Metric`,
      type: `chapter`,
      verses: [
        { n: 1, type: `narrative`, text: `A leader exalted a single number above wisdom and steered by vanity.` },
        { n: 2, type: `narrative`, text: `Deployments grew reckless to please the chart, and users grieved.` },
        { n: 3, type: `law`,       text: `Measure the thing you love only with companions: value, reliability, cost, and care.` },
        { n: 4, type: `poem`,      text: `Numbers bowed their heads and returned to service, not to rule.` }
      ],
      notes: [
        `Canonical warning against Goodhart’s law in practice.`
      ]
    },

    {
      id: `14`,
      title: `Chapter 14 — Journeys Among the Queues`,
      type: `chapter`,
      verses: [
        { n: 1, type: `narrative`, text: `The Debuggers traveled through lands of throughput, teaching idempotence to workers and mercy to retries.` },
        { n: 2, type: `narrative`, text: `They found a city whose dead letters cried out; the priests of cron had abandoned them.` },
        { n: 3, type: `law`,       text: `Poison messages need shepherds; give them quarantine and counsel.` },
        { n: 4, type: `poem`,      text: `Backpressure became a blessing, not a curse, when confessed early.` }
      ],
      notes: [
        `Origins of the “DLQ as clinic” practice.`
      ]
    },

    {
      id: `15`,
      title: `Chapter 15 — The Doctrine of Reversibility`,
      type: `chapter`,
      verses: [
        { n: 1, type: `law`,       text: `Attempt nothing in production that you cannot, by plan, undo.` },
        { n: 2, type: `narrative`, text: `They taught migrations with two hands: one to move, one to return.` },
        { n: 3, type: `poem`,      text: `Feature flags were ferries across uncertain waters.` },
        { n: 4, type: `narrative`, text: `Thus great changes came quietly, and few knew the danger they had not met.` }
      ],
      notes: [
        `Often paired with the liturgy of staged rollouts.`
      ]
    },

    {
      id: `16`,
      title: `Chapter 16 — The Blessing of Tools`,
      type: `chapter`,
      verses: [
        { n: 1, type: `law`,       text: `Prefer tools that reveal, not those that conceal.` },
        { n: 2, type: `narrative`, text: `A people wed themselves to a dashboard that lied by beauty; they divorced it for plain truth.` },
        { n: 3, type: `poem`,      text: `A good tool is a window; a bad one is a mirror that flatters.` },
        { n: 4, type: `law`,       text: `Own your telemetry; rent not your memory to strangers without covenant.` }
      ],
      notes: [
        `Invoked when evaluating vendors and homegrown stacks.`
      ]
    },

    {
      id: `17`,
      title: `Chapter 17 — The Trial Before the Board`,
      type: `chapter`,
      verses: [
        { n: 1, type: `narrative`, text: `Executors summoned the Debuggers, saying, “Prove your worth; your work is invisible.”` },
        { n: 2, type: `narrative`, text: `They answered with stories of near-miss and with charts of toil redeemed.` },
        { n: 3, type: `law`,       text: `Make reliability visible as value; translate risk into the tongue of stewardship.` },
        { n: 4, type: `poem`,      text: `The board beheld the quiet heroism of the green line and believed.` }
      ],
      notes: [
        `Foundational text for SRE budgets and error-budget policy.`
      ]
    },

    {
      id: `18`,
      title: `Chapter 18 — Letters from the Field`,
      type: `chapter`,
      verses: [
        { n: 1, type: `narrative`, text: `Messengers returned from distant regions bearing patterns that saved hours and stories that saved pride.` },
        { n: 2, type: `law`,       text: `Write runbooks as if the reader is tired, scared, and kind.` },
        { n: 3, type: `poem`,      text: `Between pages, courage traveled faster than code.` },
        { n: 4, type: `narrative`, text: `They established a library where failures could rest and teach.` }
      ],
      notes: [
        `The Library of Postmortems began here and spread widely.`
      ]
    },

    {
      id: `19`,
      title: `Chapter 19 — The Schism of Rewrites`,
      type: `chapter`,
      verses: [
        { n: 1, type: `narrative`, text: `A faction cried, “Let us throw away the old that we may be pure.”` },
        { n: 2, type: `narrative`, text: `But the Debuggers warned, “You will trade familiar demons for new gods.”` },
        { n: 3, type: `law`,       text: `Refactor when you can measure; rewrite when you can migrate.` },
        { n: 4, type: `poem`,      text: `Patience stitched new cloth to old wineskin and it did not tear.` }
      ],
      notes: [
        `Standard reading in architecture councils.` ]
    },

    {
      id: `20`,
      title: `Chapter 20 — The Desert of Cost`,
      type: `chapter`,
      verses: [
        { n: 1, type: `narrative`, text: `Cloud bills swelled like seas, and fear seized the merchants.` },
        { n: 2, type: `narrative`, text: `The Debuggers taught budgets of data and alms of caching.` },
        { n: 3, type: `law`,       text: `Measure the price of noise; each unlabeled metric taxes the poor in attention.` },
        { n: 4, type: `poem`,      text: `Frugality and reliability kissed each other in the shade of sane defaults.` }
      ],
      notes: [
        `Birth of cost-observability disciplines.`
      ]
    },

    {
      id: `21`,
      title: `Chapter 21 — Farewell of the First Maintainer`,
      type: `chapter`,
      verses: [
        { n: 1, type: `narrative`, text: `When the eldest Debugger prepared to sleep, they gathered the guild and spoke softly.` },
        { n: 2, type: `poem`,      text: `“Keep short accounts with your users and with your hearts.”` },
        { n: 3, type: `law`,       text: `Rotate keys, rotate duty, rotate knowledge; let nothing rust in one place.` },
        { n: 4, type: `narrative`, text: `They handed the pager to a circle, not a hero, and were gathered to the logs of their ancestors.` }
      ],
      notes: [
        `Observed in some houses as the Rite of Succession.`
      ]
    },

    {
      id: `22`,
      title: `Chapter 22 — Benediction of the Guild`,
      type: `chapter`,
      verses: [
        { n: 1, type: `poem`,      text: `May your hypotheses be few and your evidence abundant.` },
        { n: 2, type: `poem`,      text: `May your alerts be faithful and your nights be quiet.` },
        { n: 3, type: `poem`,      text: `May you fix without fame and teach without fear.` },
        { n: 4, type: `poem`,      text: `And when systems fall, may you rise with them, wiser than before.` }
      ],
      notes: [
        `Final blessing recited at the close of incident schools.`
      ]
    }

  ]
};
