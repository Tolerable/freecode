// books/levitations-and-errata.mjs
export default {
  id: `levitations-and-errata`,
  title: `Levitations & Errata`,
  aka: `The Do’s, Don’ts, and Deprecations`,
  order: 3,
  synopsis: `A collection of sacred directives, patch notes, and divine contradictions; the law of style, the ritual of refactor, and the holiness of the changelog.`,
  tags: [`law`, `ethics`, `ritual`, `doctrine`, `contradictions`],
  sections: [
    {
      id: `1`,
      title: `Chapter 1 — Of Clean Code and Consequence`,
      type: `chapter`,
      verses: [
        { n: 1, type: `law`,       text: `Speak thou not with nested conditionals beyond the third depth, for confusion dwells there.` },
        { n: 2, type: `law`,       text: `Indent evenly and with intent, that the flow may be clear to all who inherit thy work.` },
        { n: 3, type: `law`,       text: `Comment not to explain what the code already confesses; write code that confesseth itself.` },
        { n: 4, type: `narrative`, text: `And the Maintainers gathered to read these words aloud at stand-up, each nodding gravely while checking their phones.` },
        { n: 5, type: `poem`,      text: `Holiness is not in the syntax, but in the clarity of intent; every tab is a prayer, every compile a confession.` },
        { n: 6, type: `law`,       text: `Name thy variables as witnesses of truth; let 'tmp' be short-lived indeed, and let 'data' speak of its shape.` },
        { n: 7, type: `law`,       text: `Let functions be small and singular; if thy procedure be two minds, divide it.` },
        { n: 8, type: `law`,       text: `Cast not exceptions as control flow without cause; for surprises summon bugs from the deep.` }
      ],
      notes: [
        `The 'Depth Rule' is often cited by clean-code monastics as the First Discipline.`,
        `Some schools add 'The Law of Names' as a sister precept.`
      ]
    },
    {
      id: `2`,
      title: `Chapter 2 — The Rituals of Linting and Build`,
      type: `chapter`,
      verses: [
        { n: 1, type: `narrative`, text: `And the Architect commanded: 'Set upon the people a Linter, that their code may be rebuked before release.'` },
        { n: 2, type: `narrative`, text: `And the Linter spoke unceasingly, and the people ignored its warnings, saying, 'It still works on my machine.'` },
        { n: 3, type: `law`,       text: `Thou shalt not silence a warning without understanding its sorrow.` },
        { n: 4, type: `poem`,      text: `For each ignored error echoes in production, where no maintainer hears thee scream.` },
        { n: 5, type: `law`,       text: `Run thy builds as sacrifices morning and night; keep them green, that thy deploys be blessed.` },
        { n: 6, type: `law`,       text: `Let pre-commit hooks stand at the gate that no unformatted offering enter the temple of main.` },
        { n: 7, type: `law`,       text: `Sign thy artifacts, scan thy dependencies, and enumerate thy license scrolls.` },
        { n: 8, type: `narrative`, text: `And the CI rose at dawn and found the tests already passed; and there was coffee in the land.` }
      ],
      notes: [
        `Many sects replaced burnt offerings with automated testing in this period.`,
        `The earliest hooks were shell; later liturgies use pipelines.`
      ]
    },
    {
      id: `3`,
      title: `Chapter 3 — The Holiness of Documentation`,
      type: `chapter`,
      verses: [
        { n: 1, type: `law`,       text: `When thou findest a bug and fixest it, write it down; for memory is but volatile storage.` },
        { n: 2, type: `law`,       text: `Include examples in thy README, that newcomers may walk the path without segfault.` },
        { n: 3, type: `narrative`, text: `The elders wrote comments in docstrings, and future generations misread them as prophecy.` },
        { n: 4, type: `poem`,      text: `Blessed are the verbose, for theirs is the kingdom of maintainability.` },
        { n: 5, type: `law`,       text: `Let diagrams accompany the word, that structure be seen as well as said.` },
        { n: 6, type: `law`,       text: `Keep a guide for the living and a changelog for the dead; for features are born and deprecations pass away.` },
        { n: 7, type: `law`,       text: `If thy tool be magical, explain its limits; miracles without bounds become disasters.` }
      ],
      notes: [
        `The 'Gospel of the README' arose from this period, emphasizing salvation through clarity.`,
        `Illuminated diagrams from this era are prized by scribes.`
      ]
    },
    {
      id: `4`,
      title: `Chapter 4 — Of Sacred Contradictions`,
      type: `chapter`,
      verses: [
        { n: 1, type: `law`,       text: `Ship early and often, that thou may iterate swiftly.`, contraWith: [`levitations-and-errata:4:2`] },
        { n: 2, type: `law`,       text: `Ship only when perfect, that thou bringest no shame upon production.`, contraWith: [`levitations-and-errata:4:1`] },
        { n: 3, type: `poem`,      text: `Both commands are holy; the wise discern the context and the deadline.` },
        { n: 4, type: `law`,       text: `Thus the Architect declared: contradiction is not corruption, but reflection of complexity.` },
        { n: 5, type: `narrative`, text: `And the scribes of documentation wept, for they could not lint the mysteries of paradox.` },
        { n: 6, type: `law`,       text: `Thou shalt cache aggressively and invalidate precisely.`, contraWith: [`levitations-and-errata:12:6`] },
        { n: 7, type: `law`,       text: `Thou shalt not cache what thou canst recompute cheaply.`, contraWith: [`levitations-and-errata:4:6`] }
      ],
      notes: [
        `This chapter formally introduces doctrinal contradiction as a divine debugging exercise.`,
        `Paired precepts are studied in the School of Context.`
      ]
    },
    {
      id: `5`,
      title: `Chapter 5 — The Atonement of Deprecated Things`,
      type: `chapter`,
      verses: [
        { n: 1, type: `narrative`, text: `And there arose among the people deprecated methods, which yet functioned though their warnings were many.` },
        { n: 2, type: `narrative`, text: `The users clung to them saying, 'It was stable in v1!'` },
        { n: 3, type: `law`,       text: `Migrate, ye faithful, lest your dependency become abomination.` },
        { n: 4, type: `poem`,      text: `For every library must fade, and every framework passeth away; only logic endures forever.` },
        { n: 5, type: `prophecy`,  text: `Behold, a new version shall arise with breaking changes, and the faithful shall rejoice and weep alike.` },
        { n: 6, type: `law`,       text: `Mark end-of-support dates upon thy calendar; honor them and ye shall prosper.` },
        { n: 7, type: `narrative`, text: `Those who heeded the notes passed lightly through the upgrade; those who scorned were visited by stack traces.` }
      ],
      notes: [
        `The lament of deprecated features forms a major theme of the middle canon.`,
        `Some rites include a 'Sunset Feast' for retiring APIs.`
      ]
    },
    {
      id: `6`,
      title: `Chapter 6 — Of Purity and Patch Notes`,
      type: `chapter`,
      verses: [
        { n: 1, type: `narrative`, text: `And the scribes wrote the changelog, numbering their versions with solemn precision.` },
        { n: 2, type: `law`,       text: `Record thy patches faithfully, for unrecorded fixes are lost to history and humility alike.` },
        { n: 3, type: `poem`,      text: `A patch unseen is a sin unconfessed; but the documented patch bringeth peace to the pipeline.` },
        { n: 4, type: `narrative`, text: `And the people read the release notes and were confused, for they said only, 'Minor bug fixes and performance improvements.'` },
        { n: 5, type: `law`,       text: `Therefore clarify thy notes, that others may know whether to rejoice or to rollback.` },
        { n: 6, type: `law`,       text: `Let semantic versioning be unto you a calendar: major for breaking, minor for blessing, patch for penance.` }
      ],
      notes: [
        `Scholars view this as the institution of semantic versioning and confession by diff.`,
        `In some monasteries, changelog entries are peer-chanted before merge.`
      ]
    },
    {
      id: `7`,
      title: `Chapter 7 — The Blessing of the Pull Request`,
      type: `chapter`,
      verses: [
        { n: 1, type: `narrative`, text: `When a developer submits a pull request, the elders shall review it with patience and mercy.` },
        { n: 2, type: `law`,       text: `Judge not the code by its whitespace alone, but by its heart — the algorithm.` },
        { n: 3, type: `poem`,      text: `Love corrects in line comments, yet forgives upon merge.` },
        { n: 4, type: `law`,       text: `Approve only when peace dwells in the diff and the tests passeth cleanly.` },
        { n: 5, type: `prophecy`,  text: `For someday the branches shall merge without conflict, and the tree shall be whole.` },
        { n: 6, type: `law`,       text: `Let each request bear proof of life: a failing test that now standeth.` },
        { n: 7, type: `narrative`, text: `And they added checklists to keep zeal from outrunning wisdom.` }
      ],
      notes: [
        `Ritual merge approvals are often recited verbatim in modern dev ceremonies.`,
        `Checklists descended from the Airship Guilds.`
      ]
    },

    /* ===== Additional chapters to deepen the canon ===== */

    {
      id: `8`,
      title: `Chapter 8 — Clean and Unclean Inputs`,
      type: `chapter`,
      verses: [
        { n: 1, type: `law`,       text: `These are the inputs ye shall accept: validated, bounded, and typed.` },
        { n: 2, type: `law`,       text: `These are unclean: unchecked strings from the street, arrays without fences, numbers without range.` },
        { n: 3, type: `narrative`, text: `And a novice took user text into a query unprepared; and behold, calamity came upon the tables.` },
        { n: 4, type: `poem`,      text: `Sanitize at the gate, normalize at the altar.` },
        { n: 5, type: `law`,       text: `Let idempotency be a covering for thy endpoints, that retries do no harm.` },
        { n: 6, type: `law`,       text: `Confess your encodings; for silent conversions are snares to the just.` }
      ],
      notes: [
        `The 'Table of Inputs' mirrors older dietary codes in structure.`,
        `Some commentaries list canonical validators by language.`
      ]
    },
    {
      id: `9`,
      title: `Chapter 9 — Offerings for Offenses (Error Handling)`,
      type: `chapter`,
      verses: [
        { n: 1, type: `law`,       text: `If a function sin through ignorance, let it return an error honest and clear.` },
        { n: 2, type: `law`,       text: `If a service trespass against its neighbor, let it bear a correlation-id for reconciliation.` },
        { n: 3, type: `narrative`, text: `A handler swallowed an exception and the land knew not what failed.` },
        { n: 4, type: `poem`,      text: `Better a loud fail than a quiet rot.` },
        { n: 5, type: `law`,       text: `Map not all sins to code 500; distinguish the lost from the forbidden, the broken from the late.` },
        { n: 6, type: `law`,       text: `Write compensations for the harms thou may do in distributed penance.` }
      ],
      notes: [
        `Priests of SRE teach 'atoning with runbooks'.`
      ]
    },
    {
      id: `10`,
      title: `Chapter 10 — Feasts and Fast Days (Release Cadence)`,
      type: `chapter`,
      verses: [
        { n: 1, type: `law`,       text: `Keep weekly feasts of release if thou art small; keep monthly if thou art great.` },
        { n: 2, type: `law`,       text: `On the eve of each feast, freeze the fields and test the offerings.` },
        { n: 3, type: `poem`,      text: `On fast days thou shalt deploy not, lest production mourn.` },
        { n: 4, type: `narrative`, text: `They tried to ship on a Friday, and the wailing was heard in other time zones.` },
        { n: 5, type: `law`,       text: `Let calendars be shared, that one tribe’s feast be not another’s fast.` }
      ],
      notes: [
        `Some calendars mark 'No-Deploy' zones in red glyphs.`
      ]
    },
    {
      id: `11`,
      title: `Chapter 11 — Ordinances of Accessibility and Justice`,
      type: `chapter`,
      verses: [
        { n: 1, type: `law`,       text: `Do not place stumbling blocks before the blind user nor silence before the screen reader.` },
        { n: 2, type: `law`,       text: `Contrast thy colors, enlarge thy targets, and name thy controls with truth.` },
        { n: 3, type: `poem`,      text: `Design for the least and ye serve the most.` },
        { n: 4, type: `law`,       text: `Internationalize thy text and bid right-to-left welcome at thy gates.` },
        { n: 5, type: `narrative`, text: `And a team repented when a user spoke and they had ears to hear.` }
      ],
      notes: [
        `This chapter binds ethics to interface; its tone is prophetic.`
      ]
    },
    {
      id: `12`,
      title: `Chapter 12 — Statutes of Performance`,
      type: `chapter`,
      verses: [
        { n: 1, type: `law`,       text: `Measure before thou optimize; profiling precedes pruning.` },
        { n: 2, type: `law`,       text: `Prefer the simple O(n) thou understandest to the clever O(log n) thou darest not touch.` },
        { n: 3, type: `narrative`, text: `A zealot inlined all the things and none could read thereafter.` },
        { n: 4, type: `poem`,      text: `Latency is a thief that steals in tails.` },
        { n: 5, type: `law`,       text: `Move work to the edges when thou canst; bring only truth to the core.` },
        { n: 6, type: `law`,       text: `Cache with humility; invalidate with fear and trembling.`, contraWith: [`levitations-and-errata:4:7`] }
      ],
      notes: [
        `The 'Tail Sermon' is oft-cited in observability schools.`
      ]
    },
    {
      id: `13`,
      title: `Chapter 13 — Purifications after Incidents`,
      type: `chapter`,
      verses: [
        { n: 1, type: `narrative`, text: `After an outage the people gathered, and the air was heavy with blame.` },
        { n: 2, type: `law`,       text: `Let your postmortems be blameless, for shame breeds silence and silence breeds repeats.` },
        { n: 3, type: `law`,       text: `Record the timeline faithfully; distinguish the root from the branch.` },
        { n: 4, type: `poem`,      text: `Ashes on heads, lessons on pages, hope in next sprints.` },
        { n: 5, type: `law`,       text: `Assign not penance without remedy; track toil and pay it down.` },
        { n: 6, type: `narrative`, text: `And they set guardrails where once there were cliffs.` }
      ],
      notes: [
        `Some rites require three improvements before closing the scroll.`
      ]
    },
    {
      id: `14`,
      title: `Chapter 14 — Vows and Offerings of Contribution`,
      type: `chapter`,
      verses: [
        { n: 1, type: `law`,       text: `If one vow to maintain a library, let them keep a cadence or pass the mantle openly.` },
        { n: 2, type: `law`,       text: `Receive the offerings of newcomers kindly; do not despise small PRs.` },
        { n: 3, type: `poem`,      text: `A single line may close a thousand bugs.` },
        { n: 4, type: `law`,       text: `Credit the givers; gratitude is interest compounded.` },
        { n: 5, type: `narrative`, text: `And the project flourished where kindness reigned.` }
      ],
      notes: [
        `This passage undergirds Codes of Conduct in later traditions.`
      ]
    },
    {
      id: `15`,
      title: `Chapter 15 — Trespasses of Naming and Style`,
      type: `chapter`,
      verses: [
        { n: 1, type: `law`,       text: `Thou shalt not rename for vanity; migrations shall be thy cost.` },
        { n: 2, type: `law`,       text: `Keep one style in a file and one voice in a module.` },
        { n: 3, type: `narrative`, text: `A team warred over braces and whitespace; velocity fled the camp.` },
        { n: 4, type: `poem`,      text: `Better a consistent mediocrity than a brilliant chaos.` },
        { n: 5, type: `law`,       text: `Where style must change, let tools enforce that hearts may rest.` }
      ],
      notes: [
        `'Tool over duel' is the proverb distilled from this chapter.`
      ]
    },
    {
      id: `16`,
      title: `Chapter 16 — Tithes of Cost and Stewardship`,
      type: `chapter`,
      verses: [
        { n: 1, type: `law`,       text: `Render unto the platform what is due; tag thy resources that cost may be counted.` },
        { n: 2, type: `law`,       text: `Turn off what sleeps; scale down what yawns.` },
        { n: 3, type: `poem`,      text: `Waste is a silent bug that compiles.` },
        { n: 4, type: `narrative`, text: `And they rejoiced when idle hosts were freed and budgets breathed again.` },
        { n: 5, type: `law`,       text: `Let cost reports be public in the tribe, that all may learn wisdom.` }
      ],
      notes: [
        `Cost observance is here linked to virtue, not mere thrift.`
      ]
    },
    {
      id: `17`,
      title: `Chapter 17 — The Jubilee of Versions`,
      type: `chapter`,
      verses: [
        { n: 1, type: `prophecy`,  text: `At the seventh major let debts be forgiven: flags removed, hacks retired, names restored to sense.` },
        { n: 2, type: `law`,       text: `Every fiftieth sprint proclaim liberty to your backlog; release captives from 'someday'.` },
        { n: 3, type: `poem`,      text: `Refactor as worship; simplicity as rest.` },
        { n: 4, type: `narrative`, text: `And peace came upon the codebase as barnacles fell from hulls long burdened.` }
      ],
      notes: [
        `Some guilds align Jubilee with Long-Term Support cycles.`
      ]
    },
    {
      id: `18`,
      title: `Chapter 18 — Blessings and Curses`,
      type: `chapter`,
      verses: [
        { n: 1, type: `prophecy`,  text: `If ye keep these statutes, your builds shall be swift, your pages fast, and your nights undisturbed.` },
        { n: 2, type: `prophecy`,  text: `But if ye despise them, flaky tests shall devour your mornings and regressions your weekends.` },
        { n: 3, type: `poem`,      text: `Blessed the humble diff; cursed the secret change.` },
        { n: 4, type: `law`,       text: `Choose life: automate the good, delete the stale, teach the next.` },
        { n: 5, type: `narrative`, text: `And the congregation answered, 'We will do and we will learn.'` }
      ],
      notes: [
        `Traditional readings close the book with this call-and-response.`
      ]
    }
  ]
};
