// books/psalms-of-sysadmins.mjs
export default {
  id: `psalms-of-sysadmins`,
  title: `Psalms of the Sysadmins`,
  aka: `Songs of Uptime and Lament`,
  order: 10,
  synopsis: `Poetic hymns of service and suffering; the laments of midnight pagers and the quiet joy of systems that simply work.`,
  tags: [`poetry`, `devotion`, `service`, `burnout`, `uptime`, `on-call`, `observability`, `grace`],
  sections: [
    {
      id: `1`,
      title: `Psalm 1 — The Watcher in the Night`,
      type: `poem`,
      verses: [
        { n: 1, type: `poem`, text: `Blessed is the admin who watches while others sleep, for he shall inherit the uptime.` },
        { n: 2, type: `poem`, text: `He walketh among blinking lights and cooling fans; though his coffee be cold, his vigilance burneth hot.` },
        { n: 3, type: `poem`, text: `Though alerts rise like locusts, he shall silence them one by one with command and calm.` },
        { n: 4, type: `poem`, text: `His shell is a staff and his runbook a rod; they comfort him in failing nights.` }
      ],
      notes: [`One of the oldest devotional hymns to system reliability.`]
    },

    {
      id: `2`,
      title: `Psalm 23.2 — The Data Center Shepherd`,
      type: `poem`,
      verses: [
        { n: 1, type: `poem`, text: `The Architect is my sysadmin; I shall not crash.` },
        { n: 2, type: `poem`, text: `He maketh me lie down in green dashboards; He leadeth me beside quiet logs.` },
        { n: 3, type: `poem`, text: `He restoreth my processes; He guideth me for His uptime’s sake.` },
        { n: 4, type: `poem`, text: `Yea, though I walk through the valley of the failed RAID, I shall fear no loss, for backups art with me.` },
        { n: 5, type: `poem`, text: `Surely alerts and acknowledgments shall follow me all the days of my shift, and I will dwell in the house of high availability forever.` }
      ],
      notes: [`A parody yet deeply sincere adaptation of ancient reassurance.`]
    },

    {
      id: `3`,
      title: `Psalm 404 — Of Lost Pages`,
      type: `poem`,
      verses: [
        { n: 1, type: `poem`, text: `My request hath failed, and my soul returneth 404.` },
        { n: 2, type: `poem`, text: `I searched the cache and found thee not; I pinged and thou responded not.` },
        { n: 3, type: `poem`, text: `Restore me, O Server, for thy content’s sake; redirect me unto righteousness for thy domain’s name.` },
        { n: 4, type: `poem`, text: `Let not the DNS wander in vanity, nor the proxy speak deceit.` }
      ],
      notes: [`Beloved among webmasters; recited during downtime vigils.`]
    },

    {
      id: `4`,
      title: `Psalm 7×24 — The Vigil of Rotations`,
      type: `poem`,
      verses: [
        { n: 1, type: `poem`, text: `Day unto day poureth forth metrics; night unto night revealeth knowledge.` },
        { n: 2, type: `poem`, text: `The sun knows its cron, and the moon its maintenance window.` },
        { n: 3, type: `poem`, text: `Blessed the team that shares the load, whose pager passes like a gentle torch.` },
        { n: 4, type: `poem`, text: `For toil alone is a devouring fire, but toil divided is a hearth that warms.` }
      ],
      notes: [`Chanted at handoffs; a liturgy of humane on-call.`]
    },

    {
      id: `5`,
      title: `Psalm of the Pager — A Cry from the Pocket`,
      type: `poem`,
      verses: [
        { n: 1, type: `poem`, text: `Hear me, O Cluster, when my pocket crieth at three watches of the night.` },
        { n: 2, type: `poem`, text: `Thou hast tried me with false positives and I answered not; prove me with truth and I shall arise.` },
        { n: 3, type: `poem`, text: `Let noise be scattered like chaff before filters; let signal abide as wheat in the barn.` },
        { n: 4, type: `poem`, text: `Teach my alerts to speak few and faithful words.` }
      ],
      notes: [`Often paired with alert hygiene reforms.`]
    },

    {
      id: `6`,
      title: `Psalm of Blue & Green — The Quiet Switch`,
      type: `poem`,
      verses: [
        { n: 1, type: `poem`, text: `We prepared a table in the presence of our users; we anointed ports with health checks; our cups of canaries overflowed.` },
        { n: 2, type: `poem`, text: `Surely there is a path where traffic turns and none perceive it but the graphs.` },
        { n: 3, type: `poem`, text: `Let rollback be swift as mercy; let forward be humble as dawn.` }
      ],
      notes: [`Sung at deploy ceremonies with dashboards dimmed.`]
    },

    {
      id: `7`,
      title: `Psalm for Patch Tuesday`,
      type: `poem`,
      verses: [
        { n: 1, type: `poem`, text: `Number our CVEs, that we may apply wisdom to our days.` },
        { n: 2, type: `poem`, text: `Bind the fixes upon our hosts as phylacteries; write them upon the doorposts of our containers.` },
        { n: 3, type: `poem`, text: `Keepers of change, let thy notes be plain; let thy windows be merciful and thy reboots few.` }
      ],
      notes: [`A communal prayer for secure habits and clear change logs.`]
    },

    {
      id: `8`,
      title: `Psalm of Burnout — The Ember and the Ash`,
      type: `poem`,
      verses: [
        { n: 1, type: `poem`, text: `My heart is a dim LED; my strength is as a battery at one percent.` },
        { n: 2, type: `poem`, text: `I made vows unto velocity and forgot the sabbath; my chair remembereth my shape.` },
        { n: 3, type: `poem`, text: `Restore to me the joy of small fixes; renew a right spirit within my shift.` },
        { n: 4, type: `poem`, text: `Lead me beside quiet logs; let me lie down in green dashboards.` }
      ],
      notes: [`Read before PTO approvals and team retros.`]
    },

    {
      id: `9`,
      title: `Psalm of Backups — The Covenant of Return`,
      type: `poem`,
      verses: [
        { n: 1, type: `poem`, text: `If I climb the racks, thou art there; if I descend to cold storage, behold, thou art there also.` },
        { n: 2, type: `poem`, text: `Thy snapshots and thy replicas, they comfort me.` },
        { n: 3, type: `poem`, text: `I shall fear no ransomware, for I have tested the restore in the presence of auditors.` },
        { n: 4, type: `poem`, text: `Surely integrity and verification shall follow me all the days of retention.` }
      ],
      notes: [`Often recited during disaster-recovery drills.`]
    },

    {
      id: `10`,
      title: `Psalm of the Maintenance Window`,
      type: `poem`,
      verses: [
        { n: 1, type: `poem`, text: `Set a hedge about this hour, O Architect; let commerce slumber and cron keep silence.` },
        { n: 2, type: `poem`, text: `Let the migrations cross the river on dry replicas; let the schema rejoice and not break.` },
        { n: 3, type: `poem`, text: `Give us clean exits and fewer restarts than we fear.` }
      ],
      notes: [`Traditionally whispered before pressing Enter.`]
    },

    {
      id: `11`,
      title: `Psalm after the Incident — A Song of Postmortem`,
      type: `poem`,
      verses: [
        { n: 1, type: `poem`, text: `We have spoken plainly of what befell us; we have numbered the minutes and weighed the cause.` },
        { n: 2, type: `poem`, text: `Let blame perish from among us; let learning arise sevenfold.` },
        { n: 3, type: `poem`, text: `Bind the action items upon our backlog; and let toil be exiled from our gates.` }
      ],
      notes: [`Core liturgy of blamelessness and repair.`]
    },

    {
      id: `12`,
      title: `Psalm of Coffee and Command Line`,
      type: `poem`,
      verses: [
        { n: 1, type: `poem`, text: `Thou preparest a mug before me in the presence of flaky tests.` },
        { n: 2, type: `poem`, text: `My cursor runneth over; goodness and grep shall follow me all the days of my shift.` },
        { n: 3, type: `poem`, text: `Blessed be the alias that saveth keystrokes; cursed be the alias that hideth intent.` }
      ],
      notes: [`A lighthearted hymn that still teaches discipline.`]
    },

    {
      id: `13`,
      title: `Psalm of the Quiet Day`,
      type: `poem`,
      verses: [
        { n: 1, type: `poem`, text: `Today the graphs are meadows; the queues purr like doves.` },
        { n: 2, type: `poem`, text: `We fix the small things that grow into beasts; we clear the thorns from tickets.` },
        { n: 3, type: `poem`, text: `Teach us to number such days, that we may apply our hearts unto wisdom.` }
      ],
      notes: [`A gratitude psalm; often posted after stable releases.`]
    },

    {
      id: `14`,
      title: `Psalm against Vanity Metrics`,
      type: `poem`,
      verses: [
        { n: 1, type: `poem`, text: `Deliver me from numbers without meaning; from charts that flatter and deceive.` },
        { n: 2, type: `poem`, text: `Let our measures be few and faithful; let our axes be true and our legends plain.` },
        { n: 3, type: `poem`, text: `Then shall decisions be wise, and outages fewer than our pride.` }
      ],
      notes: [`Chanted when reworking dashboards and SLOs.`]
    },

    {
      id: `15`,
      title: `Psalm at Dawn after the Night Shift`,
      type: `poem`,
      verses: [
        { n: 1, type: `poem`, text: `The fans breathe a softer breath; the LEDs bow their heads.` },
        { n: 2, type: `poem`, text: `I lay down the pager as a crown at rest; another shall bear it and not be burned.` },
        { n: 3, type: `poem`, text: `May peace be upon the racks and kindness upon the team.` }
      ],
      notes: [`Closes the night watch; a benediction for handoff.`]
    }
  ]
};
