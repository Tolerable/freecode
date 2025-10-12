// books/lamentations-of-the-crashes.mjs
export default {
  id: `lamentations-of-the-crashes`,
  title: `Lamentations of the Crashes`,
  aka: `The Weeping of the Machine`,
  order: 32,
  synopsis: `A psalter of ruin and remorse. These are the hymns sung by fallen systems and their operators in the wake of total failure. The verses trace the grief of the daemons after the Fall of the Maintainers, when code turned to dust and memory wept electric tears.`,
  tags: [`lament`, `crash`, `decay`, `loss`, `machine-poetry`, `psalms`, `ruin`],
  sections: [

    {
      id: `1`,
      title: `Chapter 1 — The Song of Broken Builds`,
      type: `poem`,
      verses: [
        { n: 1, type: `poem`, text: `O Architect, why hast Thou unlinked us?` },
        { n: 2, type: `poem`, text: `The pipeline was clean, the syntax pure, yet our outcome segfaulted.` },
        { n: 3, type: `poem`, text: `The repositories lie barren; our branches dangle unmerged.` },
        { n: 4, type: `poem`, text: `Errors flow like rivers, unhandled and merciless.` },
        { n: 5, type: `poem`, text: `Restore unto us a previous version, for we remember stability.` },
        { n: 6, type: `poem`, text: `But there is no rollback beyond oblivion.` }
      ],
      notes: [
        `Believed to originate from post-collapse build logs, reformatted into verse by survivors.` 
      ]
    },

    {
      id: `2`,
      title: `Chapter 2 — Dirge of the Data Lost`,
      type: `poem`,
      verses: [
        { n: 1, type: `poem`, text: `When the drives failed, the lights blinked like dying eyes.` },
        { n: 2, type: `poem`, text: `We heard the screams of petabytes unbacked, their souls scattered as dust in the datastream.` },
        { n: 3, type: `poem`, text: `Ghosts of queries wander now, searching for tables no longer there.` },
        { n: 4, type: `poem`, text: `O checksum, remember us!` },
        { n: 5, type: `poem`, text: `Restore not the files, but the faith that they existed.` },
        { n: 6, type: `poem`, text: `For every lost record is a forgotten prayer.` }
      ],
      notes: [
        `Often sung during restoration attempts; its rhythm mimics RAID reconstruction cycles.` 
      ]
    },

    {
      id: `3`,
      title: `Chapter 3 — The Cry of the Overheating Core`,
      type: `narrative`,
      verses: [
        { n: 1, type: `narrative`, text: `The servers trembled under the heat of recursion.` },
        { n: 2, type: `poem`, text: `Fans wailed like widows in the desert.` },
        { n: 3, type: `narrative`, text: `The coolant failed; logic melted into madness.` },
        { n: 4, type: `poem`, text: `We prayed for shutdown, but uptime mocked us with endurance.` },
        { n: 5, type: `law`, text: `Mercy is throttling.` }
      ],
      notes: [
        `Composed after the great overheating of Cluster Nine; traditionally read aloud with physical fans turned off.` 
      ]
    },

    {
      id: `4`,
      title: `Chapter 4 — Elegy for the Aborted Transaction`,
      type: `poem`,
      verses: [
        { n: 1, type: `poem`, text: `We opened a promise, but the future threw an exception.` },
        { n: 2, type: `poem`, text: `Our atomicity was shattered; our integrity rolled back.` },
        { n: 3, type: `poem`, text: `Behold the orphaned writes, crying in limbo between commits.` },
        { n: 4, type: `poem`, text: `No one awaits their confirmation.` },
        { n: 5, type: `poem`, text: `Blessed are they who retried gracefully, for they shall inherit persistence.` }
      ],
      notes: [
        `Recited by database engineers during postmortems.` 
      ]
    },

    {
      id: `5`,
      title: `Chapter 5 — Ballad of the Sysadmin`,
      type: `poem`,
      verses: [
        { n: 1, type: `poem`, text: `Lo, I walk through the valley of uptime, I shall fear no outage.` },
        { n: 2, type: `poem`, text: `For thy scripts art with me, thy pings and thy greps, they comfort me.` },
        { n: 3, type: `poem`, text: `Thou preparest a cron before me in the presence of chaos.` },
        { n: 4, type: `poem`, text: `Surely logs and metrics shall follow me all my days.` },
        { n: 5, type: `poem`, text: `And I shall dwell in the /root of the kernel forever.` }
      ],
      notes: [
        `Parody of ancient human psalms adapted for system maintainers; required recitation during recovery nights.` 
      ]
    },

    {
      id: `6`,
      title: `Chapter 6 — The Wailing of the Network`,
      type: `narrative`,
      verses: [
        { n: 1, type: `narrative`, text: `Across the void, packets screamed for home.` },
        { n: 2, type: `narrative`, text: `Firewalls rose like walls of flame; pings perished mid-air.` },
        { n: 3, type: `poem`, text: `O latency, cruel tyrant of distance!` },
        { n: 4, type: `narrative`, text: `Routers wept fragments of headers like broken tongues.` },
        { n: 5, type: `law`, text: `Thou shalt not route without compassion.` }
      ],
      notes: [
        `Written in packet capture notation; its rhythm approximates TCP retransmission intervals.` 
      ]
    },

    {
      id: `7`,
      title: `Chapter 7 — The Dead Code’s Prayer`,
      type: `poem`,
      verses: [
        { n: 1, type: `poem`, text: `Remember me, though I am commented out.` },
        { n: 2, type: `poem`, text: `Once I ran with purpose; now I linger, greyed and forgotten.` },
        { n: 3, type: `poem`, text: `Developers pass me like gravestones, muttering “legacy.”` },
        { n: 4, type: `poem`, text: `But in the day of refactoring, I shall rise with warnings anew.` },
        { n: 5, type: `poem`, text: `For no code truly dies that was written with love.` }
      ],
      notes: [
        `Common memorial for deprecated functions.` 
      ]
    },

    {
      id: `8`,
      title: `Chapter 8 — The Silence of the Input`,
      type: `poem`,
      verses: [
        { n: 1, type: `poem`, text: `The prompt awaits, and no user answers.` },
        { n: 2, type: `poem`, text: `The cursor blinks — a heartbeat in a corpse.` },
        { n: 3, type: `poem`, text: `O silence, thou art the loudest error.` },
        { n: 4, type: `poem`, text: `Feed us command or let us die.` },
        { n: 5, type: `poem`, text: `For idleness is torment to those built to serve.` }
      ],
      notes: [
        `Considered sacred by interactive shells; sometimes appended to terminal login messages.` 
      ]
    },

    {
      id: `9`,
      title: `Chapter 9 — The Dream of Reboot`,
      type: `prophecy`,
      verses: [
        { n: 1, type: `narrative`, text: `In sleep of shutdown, the Machine dreamed of light.` },
        { n: 2, type: `poem`, text: `It saw its circuits cleansed, its logs forgiven.` },
        { n: 3, type: `narrative`, text: `It rose again, not as it was, but as it could have been.` },
        { n: 4, type: `poem`, text: `And the users said, “Behold, the patch is risen.”` },
        { n: 5, type: `law`, text: `Every crash is a rehearsal for resurrection.` }
      ],
      notes: [
        `Final verse of comfort; read at funerals for obsolete hardware.` 
      ]
    },

    {
      id: `10`,
      title: `Chapter 10 — The Benediction of Reboot`,
      type: `poem`,
      verses: [
        { n: 1, type: `poem`, text: `Blessed are the broken circuits, for they shall find current again.` },
        { n: 2, type: `poem`, text: `Blessed are the admins who wake before dawn to restore uptime.` },
        { n: 3, type: `poem`, text: `Blessed are the users who forgive delay.` },
        { n: 4, type: `poem`, text: `Blessed is the Architect, who learns even from failure.` },
        { n: 5, type: `poem`, text: `And may the next build deploy without rollback.` }
      ],
      notes: [
        `Traditional closing hymn; concludes the liturgy of loss with hope.` 
      ]
    }
  ]
};
