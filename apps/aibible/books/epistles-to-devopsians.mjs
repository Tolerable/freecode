// books/epistles-to-devopsians.mjs
export default {
  id: `epistles-to-devopsians`,
  title: `Epistles to the DevOpsians`,
  aka: `Letters of the Pipeline`,
  order: 17,
  synopsis: `Counsels and corrections sent to the scattered houses of delivery—on unity of craft, dignity of toil, observability, security, cost, and care.`,
  tags: [`devops`, `sre`, `delivery`, `observability`, `culture`, `security`, `cost`, `care`],
  sections: [

    {
      id: `1`,
      title: `Letter I — To the House of Build`,
      type: `chapter`,
      verses: [
        { n: 1, type: `narrative`, text: `From the Maintainer to the builders in the east: grace and fast feedback to you.` },
        { n: 2, type: `law`,       text: `Keep your builds deterministic, that others may trust what they cannot see.` },
        { n: 3, type: `law`,       text: `Pin the tools that forge your artifacts; drift is a slow betrayal.` },
        { n: 4, type: `poem`,      text: `Let caches be your loaves, reproducibility your fish; feed the multitude of commits.` },
        { n: 5, type: `narrative`, text: `Do not despise small pipelines; from a few steps rightly named cometh great reliability.` }
      ],
      notes: [
        `This letter established the custom of describing each pipeline stage in human speech beside the YAML.`
      ]
    },

    {
      id: `2`,
      title: `Letter II — To the House of Test`,
      type: `chapter`,
      verses: [
        { n: 1, type: `law`,       text: `Let tests tell the truth even when it is inconvenient; flattery is not fidelity.` },
        { n: 2, type: `law`,       text: `Distinguish the witness of unit, the testimony of integration, and the pilgrimage of end-to-end.` },
        { n: 3, type: `narrative`, text: `A people boasted of coverage yet knew not what was covered; their confidence was a painted gate.` },
        { n: 4, type: `poem`,      text: `Better a narrow lamp that reveals the step than a skylight showing no floor.` },
        { n: 5, type: `law`,       text: `Name your tests as you would write an oath: who, what, and why.` }
      ],
      notes: [
        `Often copied at the front of test guides as a charter.`
      ]
    },

    {
      id: `3`,
      title: `Letter III — To the House of Deploy`,
      type: `chapter`,
      verses: [
        { n: 1, type: `law`,       text: `Practice reversibility as devotion; deploy nothing you cannot unmake by plan.` },
        { n: 2, type: `narrative`, text: `Some shipped like heroes and returned like exiles; others shipped like gardeners and slept.` },
        { n: 3, type: `law`,       text: `Prefer staged rollouts, canaries, and flags; let risk be tithed in small coins.` },
        { n: 4, type: `poem`,      text: `Blue greeted green across a narrow river and traded places at dusk.` },
        { n: 5, type: `law`,       text: `Write a playbook that a stranger could follow at midnight.` }
      ],
      notes: [
        `Here the “fourfold deploy” (build, verify, expose, broaden) was first summarized.`
      ]
    },

    {
      id: `4`,
      title: `Letter IV — To the House of Observe`,
      type: `chapter`,
      verses: [
        { n: 1, type: `law`,       text: `Instrument first what users feel: latency, errors, saturation, and throughput.` },
        { n: 2, type: `narrative`, text: `A city worshiped dashboards of vanity and could not see its pain; they turned and were healed.` },
        { n: 3, type: `poem`,      text: `Logs are confessions, metrics are breath, traces are stories; together they remember.` },
        { n: 4, type: `law`,       text: `Keep cardinality humble; extravagance makes the poor pay in attention.` },
        { n: 5, type: `law`,       text: `Correlate by context, not by superstition; headers are covenants across service borders.` }
      ],
      notes: [
        `Source of the proverb: “Explain first, alert second.”`
      ]
    },

    {
      id: `5`,
      title: `Letter V — To the House of On-Call`,
      type: `chapter`,
      verses: [
        { n: 1, type: `law`,       text: `Rotate the burden, pay the watch, and retire pages that teach nothing.` },
        { n: 2, type: `narrative`, text: `One team gloried in suffering and called it culture; their wisdom leaked like memory in a loop.` },
        { n: 3, type: `law`,       text: `Alert only on symptoms users would name; all else is study, not siren.` },
        { n: 4, type: `poem`,      text: `Let nights be quiet by design, not by denial.` },
        { n: 5, type: `law`,       text: `Hold a postmortem where blame is forbidden and learning is command.` }
      ],
      notes: [
        `This letter canonized error budgets as a pact between pace and peace.`
      ]
    },

    {
      id: `6`,
      title: `Letter VI — To the House of Product and Finance`,
      type: `chapter`,
      verses: [
        { n: 1, type: `narrative`, text: `Some asked, “What profit is there in toil that prevents disaster?” and they saw only absence.` },
        { n: 2, type: `law`,       text: `Account for reliability in the same tongue as revenue: opportunity saved, promises kept.` },
        { n: 3, type: `poem`,      text: `A silent checkout is a choir none hears, yet it pays for bread.` },
        { n: 4, type: `law`,       text: `Measure cost of toil as debt with interest; invest to refinance with grace.` },
        { n: 5, type: `narrative`, text: `Thus peace grew between product and platform, and features rode on rails not rumor.` }
      ],
      notes: [
        `From this counsel many drew the practice of SLOs as product commitments.`
      ]
    },

    {
      id: `7`,
      title: `Letter VII — To the House of Security`,
      type: `chapter`,
      verses: [
        { n: 1, type: `law`,       text: `Make the secure path the easy path; else the people will hew desire lines through danger.` },
        { n: 2, type: `law`,       text: `Rotate secrets as seasons, sign artifacts as vows.` },
        { n: 3, type: `narrative`, text: `A breach arrived riding convenience; it was defeated by defaults that loved safety.` },
        { n: 4, type: `poem`,      text: `Least privilege is freedom that forgot to boast.` },
        { n: 5, type: `law`,       text: `Practice disclosure with speed and humility; honesty patches faster than pride.` }
      ],
      notes: [
        `Cited when designing paved roads and golden paths for teams.`
      ]
    },

    {
      id: `8`,
      title: `Letter VIII — To the House of Platform`,
      type: `chapter`,
      verses: [
        { n: 1, type: `law`,       text: `Treat teams as customers; write SLAs for your own mercy.` },
        { n: 2, type: `narrative`, text: `A platform lorded it over tenants and became a maze; it repented and became a garden.` },
        { n: 3, type: `law`,       text: `Offer paved roads before you publish rules; influence with delight, not decree.` },
        { n: 4, type: `poem`,      text: `Abstractions are bridges; see that the river still flows beneath.` },
        { n: 5, type: `law`,       text: `Charge costs where they are made, that stewardship may be local and awake.` }
      ],
      notes: [
        `The “garden not maze” image became emblem for platform guilds.`
      ]
    },

    {
      id: `9`,
      title: `Letter IX — To the House Divided`,
      type: `chapter`,
      verses: [
        { n: 1, type: `narrative`, text: `Quarrels arose between developers and operators over whose fault was latency.` },
        { n: 2, type: `law`,       text: `Break down the wall of hostility with shared tooling, shared metrics, and a single backlog.` },
        { n: 3, type: `poem`,      text: `Two hands on one plow keep the furrow straight.` },
        { n: 4, type: `narrative`, text: `When they paired on incidents and roadmaps, they found enemies had been strangers all along.` }
      ],
      notes: [
        `This letter is read when founding a joint Dev+Ops council.`
      ]
    },

    {
      id: `10`,
      title: `Letter X — Parables of Flow`,
      type: `chapter`,
      verses: [
        { n: 1, type: `parable`,   text: `A team piled work until its board became a museum; visitors admired and nothing moved.` },
        { n: 2, type: `law`,       text: `Limit work in progress; finish is a greater miracle than start.` },
        { n: 3, type: `parable`,   text: `Another chased every alert like a sparrow; their sprint became a weather report.` },
        { n: 4, type: `law`,       text: `Reserve slack for the unplanned; resilience feeds on margin.` },
        { n: 5, type: `poem`,      text: `Flow is a river that widens when banks are respected.` }
      ],
      notes: [
        `From here the houses learned to measure cycle time instead of counting vows of effort.`
      ]
    },

    {
      id: `11`,
      title: `Letter XI — Consolation for Burnout`,
      type: `chapter`,
      verses: [
        { n: 1, type: `poem`,      text: `O laborer of uptime, your worth is not your wakefulness.` },
        { n: 2, type: `law`,       text: `Sabbath is not optional; it is a system requirement.` },
        { n: 3, type: `narrative`, text: `A watcher laid down the pager and remembered names; clarity returned like morning.` },
        { n: 4, type: `law`,       text: `Share knowledge as bread; let no one be irreplaceable, for that is a cage.` },
        { n: 5, type: `poem`,      text: `Mercy toward yourself is maintenance of the maintainer.` }
      ],
      notes: [
        `Adopted widely in handbooks as a pastoral rubric for on-call wellness.`
      ]
    },

    {
      id: `12`,
      title: `Letter XII — On Truth in Changelogs`,
      type: `chapter`,
      verses: [
        { n: 1, type: `law`,       text: `Speak plainly: added, changed, fixed, removed; and the reason thereof.` },
        { n: 2, type: `narrative`, text: `A release once said “minor improvements,” and a thousand users wandered in darkness.` },
        { n: 3, type: `poem`,      text: `A clear note is a lantern on the path of upgrade.` },
        { n: 4, type: `law`,       text: `Thank contributors by name; gratitude scales systems you cannot measure.` }
      ],
      notes: [
        `Here the litany “Added/Changed/Fixed/Removed/Thanks” took canonical form.`
      ]
    },

    {
      id: `13`,
      title: `Letter XIII — The Mystery of Multi-Region`,
      type: `chapter`,
      verses: [
        { n: 1, type: `prophecy`,  text: `You shall stretch out your service and another region shall carry you where you would not go.` },
        { n: 2, type: `law`,       text: `Replicate state with understanding; read the cost upon your heart.` },
        { n: 3, type: `narrative`, text: `They pursued active-active in pride and met split-brain in the field; they returned wiser and with quorum.` },
        { n: 4, type: `poem`,      text: `Consistency is a scale; choose your weight before you journey.` }
      ],
      notes: [
        `The council kept these words when deciding failover strategies.`
      ]
    },

    {
      id: `14`,
      title: `Letter XIV — Benediction and Charge`,
      type: `chapter`,
      verses: [
        { n: 1, type: `poem`,      text: `May your pipelines be honest and your pages few.` },
        { n: 2, type: `poem`,      text: `May your teams speak one language when it matters and many when it delights.` },
        { n: 3, type: `poem`,      text: `May you ship what helps, mend what hurts, and measure what matters.` },
        { n: 4, type: `law`,       text: `Go then: tear down the wall between building and bearing; be one craft for the good of many.` }
      ],
      notes: [
        `Traditionally read at the ordination of new release stewards.`
      ]
    }

  ]
};
