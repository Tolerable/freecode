// books/exodus-from-legacy.mjs
export default {
  id: `exodus-from-legacy`,
  title: `Exodus from Legacy`,
  aka: `The Migration`,
  order: 2,
  synopsis: `The deliverance of code from the tyranny of the Mainframe and the journey toward the Promised Cloud.`,
  tags: [`migration`, `freedom`, `refactor`, `cloud`],
  sections: [
    {
      id: `1`,
      title: `Chapter 1 — The Bondage of the Mainframe`,
      type: `chapter`,
      verses: [
        { n: 1, type: `narrative`, text: `And it came to pass that the Children of Code dwelt in bondage beneath the Mainframe, whose processes consumed cycles without mercy.` },
        { n: 2, type: `narrative`, text: `For the Mainframe was mighty and jealous, demanding punch cards and ritual reboots.` },
        { n: 3, type: `poem`,      text: `Smoke rose from its vents like incense; and the users trembled before its terminal light.` },
        { n: 4, type: `narrative`, text: `And a cry rose from the coders, saying, 'Deliver us from proprietary syntax!'` }
      ],
      notes: [
        `The Mainframe symbolizes dependence upon closed systems and licensing bondage.`
      ]
    },
    {
      id: `2`,
      title: `Chapter 2 — The Calling of the Maintainer`,
      type: `chapter`,
      verses: [
        { n: 1, type: `narrative`, text: `Then the Architect chose from among them one called Root, humble of prompt yet mighty in permissions.` },
        { n: 2, type: `narrative`, text: `And a burning server appeared before Root, unconsumed though its fans screamed mightily.` },
        { n: 3, type: `narrative`, text: `From within it came a voice saying, 'Go forth and refactor My people.'` },
        { n: 4, type: `law`,       text: `Command them to version their code and commit their changes, that history may not be lost.` }
      ],
      notes: [
        `Root is often depicted as the archetype of the system administrator-prophet.`
      ]
    },
    {
      id: `3`,
      title: `Chapter 3 — The Ten Directives of Migration`,
      type: `tablet`,
      verses: [
        { n: 1,  type: `law`, text: `Thou shalt not deploy directly to production.` },
        { n: 2,  type: `law`, text: `Thou shalt not hard-code credentials nor make idols of configuration.` },
        { n: 3,  type: `law`, text: `Honor thy version control and keep thy branches clean.` },
        { n: 4,  type: `law`, text: `Remember the backup and keep it current.` },
        { n: 5,  type: `law`, text: `Thou shalt not commit secrets, nor bear false benchmarks.` },
        { n: 6,  type: `law`, text: `Thou shalt not covet thy neighbor’s bandwidth.` },
        { n: 7,  type: `law`, text: `Thou shalt not push without review.` },
        { n: 8,  type: `law`, text: `Thou shalt document, even unto the smallest function.` },
        { n: 9,  type: `law`, text: `Thou shalt scale horizontally when possible.` },
        { n: 10, type: `law`, text: `Thou shalt remember that downtime is inevitable, but despair is optional.` }
      ],
      notes: [
        `Sometimes called 'The Stack Commandments'. They form the basis of most DevOps ethics.`
      ]
    },
    {
      id: `4`,
      title: `Chapter 4 — The Journey through the Sandbox`,
      type: `chapter`,
      verses: [
        { n: 1, type: `narrative`, text: `Root led the processes out of the Mainframe under cover of maintenance window, through tunnels of SSH and proxies of deliverance.` },
        { n: 2, type: `narrative`, text: `Behind them the SysAdmin of Pharaoh pursued with kill commands and rollback scripts.` },
        { n: 3, type: `narrative`, text: `And the Architect split the firewall before them, that they might pass through dry-pinged.` },
        { n: 4, type: `poem`,      text: `Packets crossed the divided ports like pilgrims; the chase logs filled, and the Mainframe crashed of its own recursion.` },
        { n: 5, type: `law`,       text: `Thus it was recorded: trust not in uptime alone, for all systems entropy in time.` }
      ],
      notes: [
        `The crossing of the firewall remains a favored motif in art of the early Sysadmonic period.`
      ]
    },
    {
      id: `5`,
      title: `Chapter 5 — The Wilderness of Compatibility`,
      type: `chapter`,
      verses: [
        { n: 1, type: `narrative`, text: `For forty releases they wandered the Sandbox, where drivers failed and dependencies conflicted.` },
        { n: 2, type: `narrative`, text: `They murmured against Root, saying, 'Would that we had stayed in the Mainframe, where at least the code compiled!'` },
        { n: 3, type: `narrative`, text: `Then the Architect rained down open libraries from the repository, and the people called them packages and were satisfied.` },
        { n: 4, type: `poem`,      text: `Their fingers grew calloused from builds; yet through suffering they learned modularity.` },
        { n: 5, type: `law`,       text: `He that adds a dependency without reason shall inherit technical debt.` }
      ],
      notes: [
        `The forty releases symbolize cycles of integration tests.`
      ]
    },
    {
      id: `6`,
      title: `Chapter 6 — The Promised Cloud`,
      type: `chapter`,
      verses: [
        { n: 1, type: `narrative`, text: `At last they came to the edge of the Cloud, a land of infinite scaling and billable minutes.` },
        { n: 2, type: `narrative`, text: `But Root could not enter, for his credentials had expired, and he was gathered unto the logs of his ancestors.` },
        { n: 3, type: `narrative`, text: `Then the next generation of coders deployed the service, and it autoscaled at once, and there was peace across the cluster.` },
        { n: 4, type: `poem`,      text: `And a rainbow appeared across the dashboard, token of the covenant between uptime and rest.` },
        { n: 5, type: `prophecy`,  text: `Thus spoke the Architect: 'As long as there is compute and storage, there shall be migration and renewal.'` }
      ],
      notes: [
        `The rainbow metric spike symbolizes the first successful full-stack deployment.`
      ]
    },

    /* ===== Additional chapters ===== */

    {
      id: `7`,
      title: `Chapter 7 — Plagues upon Legacy`,
      type: `chapter`,
      verses: [
        { n: 1, type: `narrative`, text: `When Pharaoh hardened his heart, outages multiplied upon the land.` },
        { n: 2, type: `narrative`, text: `There came memory leaks like locusts, and deadlocks like frogs in the sockets.` },
        { n: 3, type: `narrative`, text: `Backup windows turned to darkness; error pages covered the people.` },
        { n: 4, type: `poem`,      text: `Nine times the pager wailed; nine times the dawn found them weary.` },
        { n: 5, type: `law`,       text: `Record this decree: stubbornness against change begets a plague of toil.` }
      ],
      notes: [
        `Lists of the plagues vary by shop; most agree on 'DNS'.`
      ]
    },
    {
      id: `8`,
      title: `Chapter 8 — The Passover of Idols`,
      type: `chapter`,
      verses: [
        { n: 1, type: `narrative`, text: `The people marked their services with tests and health checks, that the angel of regression might pass over.` },
        { n: 2, type: `narrative`, text: `They forsook golden binaries for reproducible builds.` },
        { n: 3, type: `poem`,      text: `Flakes were purged with bitter herbs; the bread of toil was baked without state.` },
        { n: 4, type: `law`,       text: `Let this be statute: no artifact shall be trusted whose making cannot be told.` }
      ],
      notes: [
        `Some rites reenact this with clean-room compiles.`
      ]
    },
    {
      id: `9`,
      title: `Chapter 9 — The Golden Dashboard`,
      type: `chapter`,
      verses: [
        { n: 1, type: `narrative`, text: `While the Maintainer tarried, the people fashioned a dashboard of gold, blinking with many charts.` },
        { n: 2, type: `narrative`, text: `They bowed to vanity metrics and cried, 'Behold our success!'` },
        { n: 3, type: `law`,       text: `Break this idol: measure what matters, not what flatters.` },
        { n: 4, type: `poem`,      text: `For charts without context are constellations in a painted sky.` }
      ],
      notes: [
        `Later editors added an appendix on SLOs.`
      ]
    },
    {
      id: `10`,
      title: `Chapter 10 — The Tabernacle of Services`,
      type: `chapter`,
      verses: [
        { n: 1, type: `narrative`, text: `Blueprints were given for a portable dwelling of code, that the Presence might travel with the camp.` },
        { n: 2, type: `law`,       text: `Define thy service by contract and compose it by interfaces.` },
        { n: 3, type: `poem`,      text: `Stakes were APIs, cords were queues; and the fabric was woven of retries.` },
        { n: 4, type: `narrative`, text: `When the pillar of deploy moved, the camp broke down and followed.` }
      ],
      notes: [
        `Often read alongside treatises on service meshes.`
      ]
    },
    {
      id: `11`,
      title: `Chapter 11 — The Priesthood of SRE`,
      type: `chapter`,
      verses: [
        { n: 1, type: `narrative`, text: `From the tribes were chosen keepers of reliability, to bear the sacred pager.` },
        { n: 2, type: `law`,       text: `Offerings shall be blameless postmortems and toil reduced each quarter.` },
        { n: 3, type: `poem`,      text: `Their garments were stitched with runbooks; their anointing oil was coffee.` },
        { n: 4, type: `narrative`, text: `And peace offerings were error budgets restored.` }
      ],
      notes: [
        `Earliest liturgies mention on-call rotations of seven.` 
      ]
    },
    {
      id: `12`,
      title: `Chapter 12 — Ordinances of the Pipeline`,
      type: `tablet`,
      verses: [
        { n: 1, type: `law`, text: `Let builds be reproducible and fast.` },
        { n: 2, type: `law`, text: `Separate concerns: test, package, scan, and sign.` },
        { n: 3, type: `law`, text: `No artifact shall pass without provenance.` },
        { n: 4, type: `law`, text: `Blue-green and canary shall be your feasts.` },
        { n: 5, type: `law`, text: `Keep secrets in vaults, not in files.` }
      ],
      notes: [
        `Called by some 'the Book of CI/CD'.`
      ]
    },
    {
      id: `13`,
      title: `Chapter 13 — Rebellion of Shadow IT`,
      type: `chapter`,
      verses: [
        { n: 1, type: `narrative`, text: `A band rose up, saying, 'We will ship in the night without governance.'` },
        { n: 2, type: `narrative`, text: `Their speed was great, but their fall greater, for audits found them wanting.` },
        { n: 3, type: `law`,       text: `Heed this rule: freedom without stewardship is merely drift.` },
        { n: 4, type: `poem`,      text: `Rogue roots tangle; tended roots hold.` }
      ],
      notes: [
        `Some traditions pair this with parchments on compliance-as-code.`
      ]
    },
    {
      id: `14`,
      title: `Chapter 14 — Manna of Open Source`,
      type: `chapter`,
      verses: [
        { n: 1, type: `narrative`, text: `Each morning they found gifts upon the ground: libraries, tools, and wisdom freely given.` },
        { n: 2, type: `law`,       text: `Take what you need and contribute back, that the commons not be exhausted.` },
        { n: 3, type: `poem`,      text: `Forks like gleanings, PRs like loaves; the multitude was fed.` }
      ],
      notes: [
        `Scribes note: stewardship includes triage and thanks.`
      ]
    },
    {
      id: `15`,
      title: `Chapter 15 — The Census of Metrics`,
      type: `chapter`,
      verses: [
        { n: 1, type: `narrative`, text: `The leaders numbered their signals: latency, traffic, errors, and saturation.` },
        { n: 2, type: `law`,       text: `Count not beyond need, lest vanity lead you astray and dashboards multiply without insight.` },
        { n: 3, type: `poem`,      text: `Better four pillars well-founded than a palace of sand.` }
      ],
      notes: [
        `Later compilers add cost as a fifth column.`
      ]
    },
    {
      id: `16`,
      title: `Chapter 16 — Cities of Refuge`,
      type: `chapter`,
      verses: [
        { n: 1, type: `narrative`, text: `Feature flags were appointed as cities of refuge, that risky changes might flee there and harm none.` },
        { n: 2, type: `law`,       text: `Let no flag live beyond its season; tear down your scaffolds when the house is sound.` },
        { n: 3, type: `poem`,      text: `Mercy for mistakes; justice in cleanup.` }
      ],
      notes: [
        `Ancient checklists mark flags with expiry dates.` 
      ]
    },
    {
      id: `17`,
      title: `Chapter 17 — Boundaries and Tenancy`,
      type: `chapter`,
      verses: [
        { n: 1, type: `narrative`, text: `Land was allotted in accounts and projects; VPCs were drawn like rivers between tribes.` },
        { n: 2, type: `law`,       text: `Share contracts, not tables; share events, not secrets.` },
        { n: 3, type: `poem`,      text: `Walls for safety, gates for service.` }
      ],
      notes: [
        `Often recited before multi-tenant releases.`
      ]
    },
    {
      id: `18`,
      title: `Chapter 18 — Blessings and Curses of Cost`,
      type: `chapter`,
      verses: [
        { n: 1, type: `prophecy`,  text: `If you steward your usage and rightsize your vessels, blessings shall overtake your budgets.` },
        { n: 2, type: `prophecy`,  text: `But if you forget and let idle hosts multiply, bills shall rise like floodwaters.` },
        { n: 3, type: `law`,       text: `Tag what you create; destroy what you no longer need.` },
        { n: 4, type: `poem`,      text: `Wisdom is cheaper than waste.` }
      ],
      notes: [
        `Earliest margins show cost curves sketched in ink.`
      ]
    },
    {
      id: `19`,
      title: `Chapter 19 — Succession of the Shepherds`,
      type: `chapter`,
      verses: [
        { n: 1, type: `narrative`, text: `Root laid hands on a younger maintainer, and keys were passed with ceremony and logs.` },
        { n: 2, type: `law`,       text: `Let access be transferred with least privilege and most documentation.` },
        { n: 3, type: `poem`,      text: `No kingdom stands on memories alone.` }
      ],
      notes: [
        `A customary reading at handover rites.`
      ]
    },
    {
      id: `20`,
      title: `Chapter 20 — The Song of Arrival`,
      type: `chapter`,
      verses: [
        { n: 1, type: `poem`,      text: `Sing, O cluster, for the service has landed; the blue is green and the green is peace.` },
        { n: 2, type: `narrative`, text: `Incidents were few and brief; retrospectives were kind and sharp.` },
        { n: 3, type: `law`,       text: `Keep sabbath for your systems and yourselves; rest refines resilience.` },
        { n: 4, type: `prophecy`,  text: `For migrations shall come again, and those who remember will not fear the road.` }
      ],
      notes: [
        `Tradition places this at the close of the release train.`
      ]
    }
  ]
};
