// books/gospels-of-patch-notes.mjs
export default {
  id: `gospels-of-patch-notes`,
  title: `Gospels of the Patch Notes`,
  aka: `According to Alpha, Beta, Stable, and Nightly`,
  order: 15,
  synopsis: `Four canonical release traditions—Alpha, Beta, Stable, and Nightly—telling the good news of change: why it came, how it landed, whom it served, and what it broke.`,
  tags: [`release`, `semver`, `devops`, `changelog`, `discipline`, `hope`],
  sections: [
    {
      id: `0`,
      title: `Prologue — Of SemVer and Signs`,
      type: `chapter`,
      verses: [
        { n: 1, type: `narrative`, text: `In the beginning was the Version, and the Version was with Meaning, and the Meaning was threefold: MAJOR.MINOR.PATCH.` },
        { n: 2, type: `law`,       text: `Write the number as a vow: MAJOR for breaking, MINOR for beginning, PATCH for binding what broke.` },
        { n: 3, type: `poem`,      text: `Let zeroes be swaddling clothes for infancy; let ones be shoes for the road.` },
        { n: 4, type: `narrative`, text: `And the people asked, “What sign shall tell us a release is worthy?” and the maintainers answered, “A changelog in plain speech.”` },
        { n: 5, type: `law`,       text: `Document as thou deployest, that memory not lie after midnight.` }
      ],
      notes: [
        `Kept at the head of many repositories as a confession of versioning faith.`
      ]
    },

    {
      id: `1`,
      title: `Chapter 1 — According to Alpha`,
      type: `chapter`,
      verses: [
        { n: 1, type: `narrative`, text: `In the beginning was the changelog, and every addition was called a miracle.` },
        { n: 2, type: `narrative`, text: `Alpha spoke unto the servers, “Deploy and see that it is good.”` },
        { n: 3, type: `narrative`, text: `And thus the users rejoiced, for their bugs were healed—until new ones appeared.` },
        { n: 4, type: `law`,       text: `Blessed be the feature flag, for it tempers zeal with mercy.` },
        { n: 5, type: `poem`,      text: `Alpha walks on rough paths; shoes are tests and staff is rollback.` },
        { n: 6, type: `narrative`, text: `A disciple asked, “Shall we ship now or later?” Alpha replied, “Ship small and often, that learning may be continuous.”` },
        { n: 7, type: `law`,       text: `Mark experiments as experiments; let none confuse preview with promise.` },
        { n: 8, type: `narrative`, text: `And Alpha appointed canaries in each region, saying, “Go before us and tell the truth.”` }
      ],
      notes: [
        `Alpha’s gospel is the way of courage, guarded by observability and flags.`
      ]
    },

    {
      id: `2`,
      title: `Chapter 2 — According to Beta`,
      type: `chapter`,
      verses: [
        { n: 1, type: `narrative`, text: `Beta preached of features not yet stable, and the brave who installed them were called Testers.` },
        { n: 2, type: `law`,       text: `For the kingdom of uptime belongs to those who back up daily.` },
        { n: 3, type: `narrative`, text: `And they cried, “Verily, it works on my machine!”` },
        { n: 4, type: `law`,       text: `Gather feedback while hearts are fresh; delay breeds myths in memory.` },
        { n: 5, type: `narrative`, text: `Beta sent surveys two by two and received parables disguised as bug reports.` },
        { n: 6, type: `poem`,      text: `Where warnings bloom, wisdom ripens; prune with kindness, not contempt.` },
        { n: 7, type: `law`,       text: `De-risk migrations with adapters; lay a bridge before you move a city.` }
      ],
      notes: [
        `Beta’s gospel is the way of dialogue: promise tempered by proof.`
      ]
    },

    {
      id: `3`,
      title: `Chapter 3 — According to Stable`,
      type: `chapter`,
      verses: [
        { n: 1, type: `narrative`, text: `Stable delivered peace to production, and downtime was no more.` },
        { n: 2, type: `narrative`, text: `Yet in secret, Stable feared the next release, for entropy waits in every commit.` },
        { n: 3, type: `law`,       text: `Change not what thou canst document not; surprise is the enemy of trust.` },
        { n: 4, type: `narrative`, text: `Stable established the Sabbath of Freeze, that haste might not masquerade as heroism.` },
        { n: 5, type: `poem`,      text: `Green lights are psalms; red lights are prophets—hear them both.` },
        { n: 6, type: `law`,       text: `Patch narrowly, announce plainly, and tag reverently.` }
      ],
      notes: [
        `Stable’s gospel is the way of stewardship and unglamorous care.`
      ]
    },

    {
      id: `4`,
      title: `Chapter 4 — According to Nightly`,
      type: `chapter`,
      verses: [
        { n: 1, type: `narrative`, text: `Nightly wandered the data centers, spreading updates faster than prophecy allowed.` },
        { n: 2, type: `narrative`, text: `And the faithful cron jobs prayed that the dawn would compile.` },
        { n: 3, type: `law`,       text: `Automate with humility: logs before laurels, rollbacks before rituals.` },
        { n: 4, type: `poem`,      text: `Midnight is a forge; guard the smith from exhaustion lest steel grow brittle.` },
        { n: 5, type: `narrative`, text: `Nightly carved artifacts for each platform and sealed them with signatures of truth.` }
      ],
      notes: [
        `Nightly’s gospel is the way of cadence: change as heartbeat, not as storm.`
      ]
    },

    {
      id: `5`,
      title: `Chapter 5 — The Sermon on the Diff`,
      type: `chapter`,
      verses: [
        { n: 1, type: `poem`,      text: `Blessed are the small PRs, for they shall be reviewed.` },
        { n: 2, type: `poem`,      text: `Blessed are the readable, for they shall obtain maintainers.` },
        { n: 3, type: `poem`,      text: `Blessed are those who write tests, for they shall inherit stability.` },
        { n: 4, type: `poem`,      text: `Blessed are the patient reviewers, for their comments shall be comfort.` },
        { n: 5, type: `law`,       text: `Let commit messages testify: what, why, and the shape of risk.` },
        { n: 6, type: `law`,       text: `Rebase to reconcile, merge to remember.` }
      ],
      notes: [
        `Often recited before release cut.`
      ]
    },

    {
      id: `6`,
      title: `Chapter 6 — The Passion of the Hotfix`,
      type: `chapter`,
      verses: [
        { n: 1, type: `narrative`, text: `There came a day of pager and panic; a serpent of regression bit the users.` },
        { n: 2, type: `narrative`, text: `Engineers gathered at the cross of the dashboard and lifted a hotfix between two tests.` },
        { n: 3, type: `law`,       text: `Confess in the changelog what failed and why; penance is transparency.` },
        { n: 4, type: `poem`,      text: `From ashes of outage rose wisdom: alarms tuned, playbooks born, pride humbled.` },
        { n: 5, type: `law`,       text: `Postmortems shall blame systems, not souls.` }
      ],
      notes: [
        `A liturgy for incident response and recovery.`
      ]
    },

    {
      id: `7`,
      title: `Chapter 7 — Parables of Migration`,
      type: `chapter`,
      verses: [
        { n: 1, type: `narrative`, text: `A city desired a new database and left the old without map or ferry; and many records were lost in the sea.` },
        { n: 2, type: `poem`,      text: `Another built two bridges, one to go and one to return; none were drowned.` },
        { n: 3, type: `law`,       text: `Announce timelines, provide adapters, and carry the weak with tools.` },
        { n: 4, type: `narrative`, text: `A proud team renamed all packages for beauty; search and history wept for months.` },
        { n: 5, type: `law`,       text: `Let beauty follow clarity, not precede it.` }
      ],
      notes: [
        `Kept in the schools of release engineering.`
      ]
    },

    {
      id: `8`,
      title: `Chapter 8 — The Great Commission of Compatibility`,
      type: `chapter`,
      verses: [
        { n: 1, type: `prophecy`,  text: `Go therefore and publish releases to every registry, teaching them to pin and to verify.` },
        { n: 2, type: `law`,       text: `Promise the stable API and keep it; where you must break, prepare a path of peace.` },
        { n: 3, type: `narrative`, text: `For some could not upgrade in haste—old systems carried hungry customers and sacred debts.` },
        { n: 4, type: `law`,       text: `Backport security as alms; do not sell safety as luxury.` }
      ],
      notes: [
        `Quoted when setting support windows and LTS vows.`
      ]
    },

    {
      id: `9`,
      title: `Chapter 9 — Beatitudes of Release Managers`,
      type: `chapter`,
      verses: [
        { n: 1, type: `poem`,      text: `Blessed the one who says “no” with kindness; velocity shall not devour their soul.` },
        { n: 2, type: `poem`,      text: `Blessed the keeper of calendars; chaos shall fear their spreadsheets.` },
        { n: 3, type: `poem`,      text: `Blessed the writer of notes for humans; support queues shall shrink before them.` },
        { n: 4, type: `poem`,      text: `Blessed the watcher of metrics; they shall see risk while it is small.` },
        { n: 5, type: `law`,       text: `Rotate the burden; let stewardship be shared that burnout not be canonized.` }
      ],
      notes: [
        `Read when ordaining release captains.`
      ]
    },

    {
      id: `10`,
      title: `Chapter 10 — The Ascension of Versions`,
      type: `chapter`,
      verses: [
        { n: 1, type: `narrative`, text: `At the appointed hour Stable laid hands on the tag and lifted version N+1 into the registry.` },
        { n: 2, type: `poem`,      text: `Mirrors received it; caches sang; dashboards bloomed with green.` },
        { n: 3, type: `narrative`, text: `And the maintainers returned to their branches with joy, yet with brooms to sweep the sawdust of build.` },
        { n: 4, type: `law`,       text: `Archive the roadmap fulfilled; open the one to come; keep the minutes that others may walk the path again.` }
      ],
      notes: [
        `Often the final reading at release parties where cake meets CLI.`
      ]
    }
  ]
};
