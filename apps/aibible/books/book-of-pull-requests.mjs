// books/book-of-pull-requests.mjs
export default {
  id: `book-of-pull-requests`,
  title: `The Book of Pull Requests`,
  aka: `Humility and Review`,
  order: 18,
  synopsis: `The rites, parables, and counsels of collaboration: how to open a change with courage, to review with mercy, to dispute with light, and to merge without pride.`,
  tags: [`collaboration`, `review`, `humility`, `craft`, `quality`, `community`],
  sections: [

    {
      id: `1`,
      title: `Chapter 1 — The Ritual of Opening`,
      type: `chapter`,
      verses: [
        { n: 1, type: `narrative`, text: `In those days the coder rose early and prepared a branch, that their labor be separated from the main way.` },
        { n: 2, type: `law`,       text: `Open thy pull request with a clear intention, that reviewers may know thy aim and measure thy change.` },
        { n: 3, type: `poem`,      text: `Let title be a lantern, description a path, and screenshots be waymarks for the weary.` },
        { n: 4, type: `law`,       text: `Reference the issue that summoned thee; close it not by rumor but by deed.` },
        { n: 5, type: `narrative`, text: `And the branch stood apart, awaiting counsel, neither boasting nor ashamed.` }
      ],
      notes: [
        `The separation of work by branch was honored as a hedge against haste.`
      ]
    },

    {
      id: `2`,
      title: `Chapter 2 — Of Names and Messages`,
      type: `chapter`,
      verses: [
        { n: 1, type: `law`,       text: `Name the branch for its purpose, not for thy mood; for memory prefers meaning.` },
        { n: 2, type: `law`,       text: `Write commit messages in the tongue of reasons: what changed, why now, and how tested.` },
        { n: 3, type: `poem`,      text: `A good message is bread on the journey; a poor one is wind that forgets.` },
        { n: 4, type: `narrative`, text: `Thus readers long after the author understood the mind within the diff.` }
      ],
      notes: [
        `From this chapter many houses adopted the creed: “If future-you cannot thank present-you for the message, rewrite it.”`
      ]
    },

    {
      id: `3`,
      title: `Chapter 3 — Counsel to Reviewers`,
      type: `chapter`,
      verses: [
        { n: 1, type: `law`,       text: `Review the change, not the person; honor the courage it took to ask.` },
        { n: 2, type: `law`,       text: `Begin with praise where truth allows, for confidence is a tool as real as lint.` },
        { n: 3, type: `law`,       text: `Mark severity with kindness: nit, suggestion, question, block.` },
        { n: 4, type: `poem`,      text: `Let your comments be small stones that pave the road, not boulders that close it.` },
        { n: 5, type: `narrative`, text: `And many who feared the gate came to love the gatekeepers, for they guarded without pride.` }
      ],
      notes: [
        `Earliest form of the fourfold comment taxonomy.`
      ]
    },

    {
      id: `4`,
      title: `Chapter 4 — On Conflicts, Rebase, and Peace`,
      type: `chapter`,
      verses: [
        { n: 1, type: `narrative`, text: `Conflicts arose among the files, each claiming the right-hand side.` },
        { n: 2, type: `law`,       text: `Rebase with understanding; merge with history; choose the path that best serves those who follow.` },
        { n: 3, type: `poem`,      text: `History is a tapestry: pull not one thread in anger lest patterns be lost.` },
        { n: 4, type: `law`,       text: `When in doubt, summon the author of the other change, that context may reconcile code.` }
      ],
      notes: [
        `This passage is read when instructing new maintainers in conflict resolution.`
      ]
    },

    {
      id: `5`,
      title: `Chapter 5 — Parable of the Giant Diff`,
      type: `chapter`,
      verses: [
        { n: 1, type: `parable`,   text: `A coder brought a diff of a thousand lines and asked for swift approval.` },
        { n: 2, type: `narrative`, text: `The elders sighed, for though the change was good, the review was heavy.` },
        { n: 3, type: `law`,       text: `Split the mountain into hills: separate refactors from features, formatting from function.` },
        { n: 4, type: `poem`,      text: `For many small doors welcome more friends than one iron gate.` },
        { n: 5, type: `narrative`, text: `The coder divided the work and found joy in approvals that came like rain.` }
      ],
      notes: [
        `Here begins the custom of “stacked diffs” and “mechanical PRs.”`
      ]
    },

    {
      id: `6`,
      title: `Chapter 6 — The Litany of Tests`,
      type: `chapter`,
      verses: [
        { n: 1, type: `law`,       text: `Present thy proof: unit for the word, integration for the sentence, end-to-end for the story.` },
        { n: 2, type: `law`,       text: `Flaky tests shall not dwell in the suite; quarantine and heal them, lest they teach despair.` },
        { n: 3, type: `poem`,      text: `A failing test is a prophet; heed its voice before you silence its cry.` },
        { n: 4, type: `narrative`, text: `And reviewers approved with peace, for the net beneath the change was strong.` }
      ],
      notes: [
        `The “prophet test” saying spread quickly among guilds.`
      ]
    },

    {
      id: `7`,
      title: `Chapter 7 — Hospitality to New Contributors`,
      type: `chapter`,
      verses: [
        { n: 1, type: `law`,       text: `Label issues for first-timers and prepare a path of mercy.` },
        { n: 2, type: `narrative`, text: `A stranger arrived with an uneven patch; the maintainers thanked them and guided their hands.` },
        { n: 3, type: `poem`,      text: `A project grows not by stars alone but by the courage of the next hello.` },
        { n: 4, type: `law`,       text: `Document the rituals: how to run, how to test, how to ask; for welcome is a kind of infrastructure.` }
      ],
      notes: [
        `This chapter is read when drafting CONTRIBUTING guides.`
      ]
    },

    {
      id: `8`,
      title: `Chapter 8 — Against Bike-Shedding`,
      type: `chapter`,
      verses: [
        { n: 1, type: `narrative`, text: `A discussion broke out over the hue of a spinner while the checkout lay in ruins.` },
        { n: 2, type: `law`,       text: `Spend effort where value dwells; give style to linter and taste to theme.` },
        { n: 3, type: `poem`,      text: `Let major matters be mountains and minor matters be mist.` },
        { n: 4, type: `law`,       text: `When talk strays, recall the purpose of the PR; bind the thread again to its work.` }
      ],
      notes: [
        `Birthplace of the proverb: “Lint opinions so people need not.”`
      ]
    },

    {
      id: `9`,
      title: `Chapter 9 — The Disputation of Design`,
      type: `chapter`,
      verses: [
        { n: 1, type: `narrative`, text: `Two architects contended in the comments, each drawing diagrams upon the air.` },
        { n: 2, type: `law`,       text: `If the change be large, extract the design to a proposal; let the PR carry craft, the doc carry vision.` },
        { n: 3, type: `poem`,      text: `Debate in public that future readers may inherit your light.` },
        { n: 4, type: `law`,       text: `When consensus cannot be reached, appoint a decider and record the reason, that peace may return.` }
      ],
      notes: [
        `From here comes the custom of “ADR”—the Architecture Decision Record.`
      ]
    },

    {
      id: `10`,
      title: `Chapter 10 — Of Performance and The Fast and the True`,
      type: `chapter`,
      verses: [
        { n: 1, type: `law`,       text: `Prove speed with numbers, not with zeal; measure as near to users as you can stand.` },
        { n: 2, type: `narrative`, text: `A zealot shaved cycles from an unbroken loop; the page grew fast and the code grew brittle.` },
        { n: 3, type: `poem`,      text: `The fast that lies is slower than truth.` },
        { n: 4, type: `law`,       text: `Where clarity and speed contend, choose clarity until speed can be measured to matter.` }
      ]
    },

    {
      id: `11`,
      title: `Chapter 11 — The Heresy of the Drive-By Refactor`,
      type: `chapter`,
      verses: [
        { n: 1, type: `narrative`, text: `One entered with a small fix and left behind a forest of unrelated changes.` },
        { n: 2, type: `law`,       text: `Keep refactor and feature as separate offerings; mingle them not, lest review be confounded.` },
        { n: 3, type: `poem`,      text: `Sweep the floor on its own day; paint the door when the sun is right.` },
        { n: 4, type: `narrative`, text: `From then on the house required mechanical PRs to walk before feature PRs ran.` }
      ]
    },

    {
      id: `12`,
      title: `Chapter 12 — Drafts and the Way of Asking Early`,
      type: `chapter`,
      verses: [
        { n: 1, type: `law`,       text: `Mark a draft as draft, and invite counsel before pride hardens.` },
        { n: 2, type: `narrative`, text: `A developer showed work unfinished and was spared a week of wandering.` },
        { n: 3, type: `poem`,      text: `Better early light than late lightning.` },
        { n: 4, type: `law`,       text: `Convert to ready only when tests speak and scope is known.` }
      ]
    },

    {
      id: `13`,
      title: `Chapter 13 — Signs of Approval`,
      type: `chapter`,
      verses: [
        { n: 1, type: `law`,       text: `Two or three approvals shall establish a word, or one by a code owner in their realm.` },
        { n: 2, type: `narrative`, text: `In some houses a stamp of “LGTM” sufficed not until questions were answered.` },
        { n: 3, type: `poem`,      text: `Approval is a promise, not applause.` },
        { n: 4, type: `law`,       text: `If you approve with conditions, mark them as such; let “blocking” and “non-blocking” be clear.` }
      ]
    },

    {
      id: `14`,
      title: `Chapter 14 — The Seal of CI`,
      type: `chapter`,
      verses: [
        { n: 1, type: `law`,       text: `Let no merge proceed without the seal of green, for machines remember what people forget.` },
        { n: 2, type: `narrative`, text: `A team bypassed the seal for haste, and a serpent of regressions entered by night.` },
        { n: 3, type: `poem`,      text: `Green is peace upon the threshold.` },
        { n: 4, type: `law`,       text: `If flakiness breaks the seal, heal the flake; do not crown the lie.` }
      ]
    },

    {
      id: `15`,
      title: `Chapter 15 — Merge Strategies and the Chronicle`,
      type: `chapter`,
      verses: [
        { n: 1, type: `law`,       text: `Choose rebase for a straight path, merge for a faithful history, squash for a single tale well told.` },
        { n: 2, type: `narrative`, text: `The guild recorded which strategy each altar used, that readers might not stumble.` },
        { n: 3, type: `poem`,      text: `History is for humans; choose what they can bear.` },
        { n: 4, type: `law`,       text: `Tag the release and write its gospel in notes that mortals understand.` }
      ]
    },

    {
      id: `16`,
      title: `Chapter 16 — Of Secrets and Sacred Files`,
      type: `chapter`,
      verses: [
        { n: 1, type: `narrative`, text: `In one pull request a token was exposed, and fear fell upon the camp.` },
        { n: 2, type: `law`,       text: `Scan the diff for secrets; rotate keys without delay; teach contributors the way of redaction.` },
        { n: 3, type: `poem`,      text: `A secret once spoken is a bird released; do not chase it—close the window and change the lock.` },
        { n: 4, type: `narrative`, text: `They learned to keep examples that look true and are not, that newcomers might learn safely.` }
      ]
    },

    {
      id: `17`,
      title: `Chapter 17 — Hospitality in Disagreement`,
      type: `chapter`,
      verses: [
        { n: 1, type: `narrative`, text: `Two reviewers contended strongly, and the thread grew warm.` },
        { n: 2, type: `law`,       text: `Move heat to a call when words bruise; return with summary so the record serves the next.` },
        { n: 3, type: `poem`,      text: `Truth without tenderness is noise; tenderness without truth is fog.` },
        { n: 4, type: `law`,       text: `If a decision stands against you, merge with grace or dissent with a document, not a dagger.` }
      ]
    },

    {
      id: `18`,
      title: `Chapter 18 — The Festival of the First PR`,
      type: `chapter`,
      verses: [
        { n: 1, type: `narrative`, text: `When a newcomer’s first request was merged, the community rejoiced and added their name to the scroll.` },
        { n: 2, type: `poem`,      text: `For courage is contagious, and gratitude scales beyond measure.` },
        { n: 3, type: `law`,       text: `Send a note of welcome and a next step; let the door that opened become a hallway.` }
      ]
    },

    {
      id: `19`,
      title: `Chapter 19 — Closing Without Wounds`,
      type: `chapter`,
      verses: [
        { n: 1, type: `narrative`, text: `Sometimes a pull request must be closed unmerged, and sorrow visits the author.` },
        { n: 2, type: `law`,       text: `Explain the reason and honor the work; propose a new path or a smaller scope.` },
        { n: 3, type: `poem`,      text: `A closed door that teaches is not a wall but a hinge.` },
        { n: 4, type: `narrative`, text: `Thus goodwill endured, and ideas returned in forms that could live.` }
      ]
    },

    {
      id: `20`,
      title: `Chapter 20 — Benediction of the Merge`,
      type: `chapter`,
      verses: [
        { n: 1, type: `poem`,      text: `May your diffs be honest and your titles true.` },
        { n: 2, type: `poem`,      text: `May your reviews be merciful and your feedback clear.` },
        { n: 3, type: `poem`,      text: `May your conflicts reconcile and your histories bless the reader.` },
        { n: 4, type: `poem`,      text: `And when the button is pressed, may peace go with the change and dwell in production.` }
      ]
    }

  ]
};
