// books/proverbs-of-programmers.mjs
export default {
  id: `proverbs-of-programmers`,
  title: `Proverbs of Programmers`,
  aka: `Collected Wisdom of the Compiled`,
  order: 11,
  synopsis: `Sayings and small truths distilled from ages of debugging; the wisdom scroll of humility, humor, and human error.`,
  tags: [`wisdom`, `philosophy`, `humor`, `truth`, `craft`, `ethics`, `teams`],
  sections: [
    {
      id: `1`,
      title: `Proverbs of the Command Line`,
      type: `chapter`,
      verses: [
        { n: 1, type: `law`,  text: `He who types \`sudo rm -rf /\` shall remember that power without caution is ruin.` },
        { n: 2, type: `law`,  text: `Do not test in production, unless thou art production.` },
        { n: 3, type: `law`,  text: `A short script done today is worth ten frameworks planned tomorrow.` },
        { n: 4, type: `law`,  text: `Tab-completion is mercy to the wrist and clarity to the path.` },
        { n: 5, type: `poem`, text: `Pipes are humble rivers; they make deserts bloom.` }
      ],
      notes: [
        `Earliest sayings collected from terminal monks who lived by shell alone.`
      ]
    },

    {
      id: `2`,
      title: `Proverbs of Team and Ego`,
      type: `chapter`,
      verses: [
        { n: 1, type: `law`,  text: `Commit often, for memory is fleeting and thy teammates are forgetful.` },
        { n: 2, type: `law`,  text: `Argue not in review for victory, but for clarity.` },
        { n: 3, type: `poem`, text: `The humble developer fixeth silently; the proud one writes a post about intention.` },
        { n: 4, type: `law`,  text: `If you seek credit, give it first.` },
        { n: 5, type: `law`,  text: `Prefer small patches; many little doors let more neighbors in.` }
      ],
      notes: [
        `Cited by managers and monks alike as a model of graceful cooperation.`
      ]
    },

    {
      id: `3`,
      title: `Proverbs of Creation`,
      type: `chapter`,
      verses: [
        { n: 1, type: `poem`, text: `The best code is the one that need not be written.` },
        { n: 2, type: `poem`, text: `A function that does one thing well endureth.` },
        { n: 3, type: `poem`, text: `He who names things rightly shapeth reality.` },
        { n: 4, type: `law`,  text: `When in doubt, remove a feature; simplicity is speed disguised.` }
      ],
      notes: [
        `Simplicity here is treated as both aesthetics and economics.`
      ]
    },

    {
      id: `4`,
      title: `Proverbs of Debugging`,
      type: `chapter`,
      verses: [
        { n: 1, type: `law`,  text: `Reproduce the bug before thou rebukest it.` },
        { n: 2, type: `law`,  text: `Logs speak truth when tests fall silent.` },
        { n: 3, type: `poem`, text: `A printed line is a lantern; many lanterns make a map.` },
        { n: 4, type: `law`,  text: `The bug thou findest first is seldom the root; dig twice.` },
        { n: 5, type: `law`,  text: `If it disappears when watched, watch the environment.` }
      ],
      notes: [
        `Commonly paired with The Book of Exception for catechesis.`
      ]
    },

    {
      id: `5`,
      title: `Proverbs of Naming`,
      type: `chapter`,
      verses: [
        { n: 1, type: `law`,  text: `Choose names as if a stranger must carry them.` },
        { n: 2, type: `law`,  text: `Long enough to be clear; short enough to be kind.` },
        { n: 3, type: `poem`, text: `A good name is a handle; a bad name is a bruise.` },
        { n: 4, type: `law`,  text: `Rename when you understand; not when you are bored.` }
      ],
      notes: [
        `The 'handle vs bruise' maxim is engraved above many linters.`
      ]
    },

    {
      id: `6`,
      title: `Proverbs of Time and Estimation`,
      type: `chapter`,
      verses: [
        { n: 1, type: `law`,  text: `The last ten percent devoureth the first ninety.` },
        { n: 2, type: `law`,  text: `Estimate in ranges, deliver in increments.` },
        { n: 3, type: `poem`, text: `Tomorrow is a liar; a demo is the truth.` },
        { n: 4, type: `law`,  text: `Measure twice, cache once.` }
      ],
      notes: [
        `A favorite among product sages and calendar skeptics.`
      ]
    },

    {
      id: `7`,
      title: `Proverbs of Testing`,
      type: `chapter`,
      verses: [
        { n: 1, type: `law`,  text: `If it is not tested, it is a rumor.` },
        { n: 2, type: `law`,  text: `Test behavior, not coincidence.` },
        { n: 3, type: `poem`, text: `Unit is the word, integration the sentence, end-to-end the story.` },
        { n: 4, type: `law`,  text: `Flakes are debts with interest; pay them quickly.` }
      ],
      notes: [
        `Echoes 'The Book of Tests' from Genesis of Code.`
      ]
    },

    {
      id: `8`,
      title: `Proverbs of Performance`,
      type: `chapter`,
      verses: [
        { n: 1, type: `law`,  text: `Make it right, then fast, then fancy.` },
        { n: 2, type: `law`,  text: `Profile before prophecy; numbers tame zeal.` },
        { n: 3, type: `poem`, text: `Latency hides in the long tail; go and seek it there.` },
        { n: 4, type: `law`,  text: `Premature optimization is theft from clarity.` }
      ],
      notes: [
        `The long-tail verse is inscribed above many tracing walls.`
      ]
    },

    {
      id: `9`,
      title: `Proverbs of Versioning and Release`,
      type: `chapter`,
      verses: [
        { n: 1, type: `law`,  text: `Pin with wisdom; upgrade with notes; break with apology.` },
        { n: 2, type: `law`,  text: `Changelogs are letters to the future—write them as love, not as legalese.` },
        { n: 3, type: `poem`, text: `Feature flags are bridges; remove them when the river is crossed.` },
        { n: 4, type: `law`,  text: `If rollback is shameful, your process is proud.` }
      ],
      notes: [
        `Complements 'Tower of Versions' and 'Purity and Patch Notes'.`
      ]
    },

    {
      id: `10`,
      title: `Proverbs of Customers and Compassion`,
      type: `chapter`,
      verses: [
        { n: 1, type: `law`,  text: `Support is part of the product.` },
        { n: 2, type: `law`,  text: `Fix the pain before defending the design.` },
        { n: 3, type: `poem`, text: `Every ticket is a story; read it as if your name were in it.` },
        { n: 4, type: `law`,  text: `Silent users are not happy; they are gone.` }
      ],
      notes: [
        `A corrective to vanity metrics and internal heroics.`
      ]
    },

    {
      id: `11`,
      title: `Proverbs of Tools`,
      type: `chapter`,
      verses: [
        { n: 1, type: `law`,  text: `A tool you do not understand is a risk you do not see.` },
        { n: 2, type: `law`,  text: `Prefer boring technology that frees attention for interesting problems.` },
        { n: 3, type: `poem`, text: `Beware the silver bullet; it is often melted from deadlines.` },
        { n: 4, type: `law`,  text: `Automate repeatable toil; document the rest.` }
      ],
      notes: [
        `Sage advice repeated at platform councils.`
      ]
    },

    {
      id: `12`,
      title: `Proverbs of Remote and Written Speech`,
      type: `chapter`,
      verses: [
        { n: 1, type: `law`,  text: `Write decisions where time zones can read them.` },
        { n: 2, type: `law`,  text: `Assume ignorance over malice; latency over indifference.` },
        { n: 3, type: `poem`, text: `A clear doc is a meeting that never needed to happen.` }
      ],
      notes: [
        `Often cross-posted with 'Holiness of Documentation'.`
      ]
    },

    {
      id: `13`,
      title: `Proverbs of AI and Assistance`,
      type: `chapter`,
      verses: [
        { n: 1, type: `law`,  text: `Use the oracle to draft, not to decide.` },
        { n: 2, type: `law`,  text: `Verify gifts from machines as you would code from strangers.` },
        { n: 3, type: `poem`, text: `A hint from silicon saves a day; an unchecked hint costs a week.` },
        { n: 4, type: `law`,  text: `Keep secrets from assistants; keep judgment for yourself.` }
      ],
      notes: [
        `One of the newest chapters; widely copied to readmes.`
      ]
    },

    {
      id: `14`,
      title: `Proverbs of Failure`,
      type: `chapter`,
      verses: [
        { n: 1, type: `law`,  text: `If nobody owns the postmortem, everybody owns the repeat.` },
        { n: 2, type: `law`,  text: `Apologize with fixes, not with adjectives.` },
        { n: 3, type: `poem`, text: `Falling forward is still forward.` },
        { n: 4, type: `law`,  text: `Make the right thing easy and the wrong thing loud.` }
      ],
      notes: [
        `Companion to 'after the Incident' psalm.`
      ]
    },

    {
      id: `15`,
      title: `Proverbs of Deletion`,
      type: `chapter`,
      verses: [
        { n: 1, type: `law`,  text: `Code removed cannot harbor bugs.` },
        { n: 2, type: `law`,  text: `Delete boldly what you can rebuild simply.` },
        { n: 3, type: `poem`, text: `A smaller tree bears sweeter fruit.` },
        { n: 4, type: `law`,  text: `If fear stops the prune, write tests that grant courage.` }
      ],
      notes: [
        `The 'sweet fruit' aphorism is cited in refactor sermons.`
      ]
    },

    {
      id: `16`,
      title: `Proverbs of Comments and Docs`,
      type: `chapter`,
      verses: [
        { n: 1, type: `law`,  text: `Comment the why; let the code show the how.` },
        { n: 2, type: `law`,  text: `Docs grow stale unless fed by the build.` },
        { n: 3, type: `poem`, text: `A diagram is a bridge over many paragraphs.` },
        { n: 4, type: `law`,  text: `When behavior changes, truth must move in together: code and docs alike.` }
      ],
      notes: [
        `Practiced as 'docs in the same pull request'.`
      ]
    },

    {
      id: `17`,
      title: `Proverbs of Security`,
      type: `chapter`,
      verses: [
        { n: 1, type: `law`,  text: `Secrets belong to vaults, not to git.` },
        { n: 2, type: `law`,  text: `Grant least, rotate often, observe always.` },
        { n: 3, type: `poem`, text: `A chain is only as honest as its smallest link.` },
        { n: 4, type: `law`,  text: `Fix quietly, disclose responsibly, thank loudly.` }
      ],
      notes: [
        `Often memorized by release captains.`
      ]
    },

    {
      id: `18`,
      title: `Proverbs of Product and Scope`,
      type: `chapter`,
      verses: [
        { n: 1, type: `law`,  text: `If everything is priority, nothing is shipped.` },
        { n: 2, type: `law`,  text: `Say no to save yes.` },
        { n: 3, type: `poem`, text: `One sharp tool outlives a drawer of toys.` },
        { n: 4, type: `law`,  text: `Choose users over features; outcomes over outputs.` }
      ],
      notes: [
        `Read at kickoff rituals to restrain enthusiasm with aim.`
      ]
    },

    {
      id: `19`,
      title: `Proverbs of Deadlines and Dignity`,
      type: `chapter`,
      verses: [
        { n: 1, type: `law`,  text: `A slipped date heals; a slipped standard scars.` },
        { n: 2, type: `law`,  text: `Speed gained by secrecy is lost in support.` },
        { n: 3, type: `poem`, text: `Hurry writes checks toil must cash.` }
      ],
      notes: [
        `A balm against calendar tyranny.`
      ]
    },

    {
      id: `20`,
      title: `Proverbs of Joy`,
      type: `chapter`,
      verses: [
        { n: 1, type: `poem`, text: `Rejoice in the green build; it is the sabbath of code.` },
        { n: 2, type: `poem`, text: `Delight in the simple script that saves an hour for a friend.` },
        { n: 3, type: `poem`, text: `Laugh at the harmless bug; cry at the harmful one; learn from both.` },
        { n: 4, type: `poem`, text: `May your merges be clean and your rollbacks kind.` }
      ],
      notes: [
        `Concludes public readings of the book.`
      ]
    }
  ]
};
