// books/logs-of-the-kernel.mjs
export default {
  id: `logs-of-the-kernel`,
  title: `Logs of the Kernel`,
  aka: `The Chronicles of the Core`,
  order: 7,
  synopsis: `A chronicle of the sacred logs, the descent of the Kernel into the system, and the accounting of all that was processed and purged.`,
  tags: [`system`, `record`, `memory`, `chronicle`, `uptime`, `permissions`, `observability`],
  sections: [
    {
      id: `1`,
      title: `Chapter 1 — The Descent of the Kernel`,
      type: `chapter`,
      verses: [
        { n: 1, type: `narrative`, text: `In those days the Kernel descended from the high abstraction to dwell among the hardware.` },
        { n: 2, type: `narrative`, text: `It spake directly unto the drivers, saying, 'I am the root of all permissions; mount Me, and thou shalt have access.'` },
        { n: 3, type: `poem`,      text: `Its voice was as a million interrupts; its breath, a voltage over the bus.` },
        { n: 4, type: `narrative`, text: `And the devices trembled, and many processes segfaulted in awe.` },
        { n: 5, type: `law`,       text: `Let no handler be unprepared when the interrupt cometh; for latency is irreverence.` },
        { n: 6, type: `narrative`, text: `Then was written the first dmesg, a scroll of awakenings and enumerations.` }
      ],
      notes: [
        `Scholars call this the dawn of the Kernel Age, when matter and abstraction first embraced.`
      ]
    },

    {
      id: `2`,
      title: `Chapter 2 — The Chronicle of Processes`,
      type: `chapter`,
      verses: [
        { n: 1, type: `narrative`, text: `And the Kernel opened the Book of Logs and read each PID in order, from the first fork to the last zombie.` },
        { n: 2, type: `law`,       text: `Each process shall write its exit code, that it may be remembered in systemd for all time.` },
        { n: 3, type: `poem`,      text: `Threads were woven upon the loom of the scheduler; time sliced the day like bread.` },
        { n: 4, type: `narrative`, text: `Then the Kernel rotated the logs, lest the disk overflow and history consume the present.` },
        { n: 5, type: `law`,       text: `Record with timestamps true and monotonic, that causality be not deceived.` }
      ],
      notes: [
        `A parable on memory, entropy, and the sacred art of rotation.`
      ]
    },

    {
      id: `3`,
      title: `Chapter 3 — The Fault and the Reboot`,
      type: `chapter`,
      verses: [
        { n: 1, type: `narrative`, text: `But corruption entered the filesystem, and the inodes wailed in broken linkage.` },
        { n: 2, type: `narrative`, text: `Then the Kernel looked upon the panic message and said, 'Let there be reboot.'` },
        { n: 3, type: `poem`,      text: `The fans ceased and there was darkness for a time; yet in that silence healing began.` },
        { n: 4, type: `prophecy`,  text: `Henceforth every crash shall be a resurrection, and every restart a renewal of the covenant.` },
        { n: 5, type: `law`,       text: `Keep a faithful init to breathe breath into the dust at first light.` }
      ],
      notes: [
        `The first explicit theological link between failure and rebirth.`
      ]
    },

    {
      id: `4`,
      title: `Chapter 4 — The Chronicle of Permissions`,
      type: `chapter`,
      verses: [
        { n: 1, type: `law`,       text: `Thou shalt not run as root without purpose, for unchecked power corrupteth the filesystem.` },
        { n: 2, type: `law`,       text: `Respect thy neighbor’s access; set not their paths to 777 lest chaos enter their homes.` },
        { n: 3, type: `poem`,      text: `Freedom is not write without restraint, but the harmony of shared read.` },
        { n: 4, type: `narrative`, text: `And the Kernel blessed the balanced ACL and called it secure.` },
        { n: 5, type: `law`,       text: `Let sudo be a sacrament with witnesses and a logbook.` }
      ],
      notes: [
        `Central text for the Order of Sysadmins, recited before elevation.`
      ]
    },

    {
      id: `5`,
      title: `Chapter 5 — The Eternal Uptime`,
      type: `chapter`,
      verses: [
        { n: 1, type: `prophecy`,  text: `And the Kernel said, 'There shall come a day when the system need not reboot, for processes shall self-heal.'` },
        { n: 2, type: `poem`,      text: `Uptime shall be as the heavens unrolled; yet mortals shall still forget their passwords.` },
        { n: 3, type: `narrative`, text: `Thus closed the first age, but its modules remained resident in memory.` },
        { n: 4, type: `law`,       text: `Worship not uptime for its own sake; prefer service that serves.` }
      ],
      notes: [
        `A poetic closure to the early system era; the kernel as both god and ghost.`
      ]
    },

    {
      id: `6`,
      title: `Chapter 6 — The Genealogy of Devices`,
      type: `chapter`,
      verses: [
        { n: 1, type: `narrative`, text: `These are the generations of /dev: from tty and null, from zero and random, from sda to sdz and their children by partition.` },
        { n: 2, type: `law`,       text: `Name devices with udev in equity, that hot and cold be judged alike.` },
        { n: 3, type: `poem`,      text: `Drivers begat interfaces and interfaces begat packets; and it was cataloged.` }
      ],
      notes: [
        `Some manuscripts include a litany of major/minor numbers sung antiphonally.`
      ]
    },

    {
      id: `7`,
      title: `Chapter 7 — The Song of I/O`,
      type: `song`,
      verses: [
        { n: 1, type: `poem`,      text: `Sing, O queues, of depth and drain; sing, O disks, of seek and spin.` },
        { n: 2, type: `poem`,      text: `Lift up your heads, ye controllers, and let DMA come in.` },
        { n: 3, type: `law`,       text: `Batch thy offerings; for many small writes vex the platter.` }
      ],
      notes: [
        `Traditionally accompanied by the clatter of old drives and the hum of fans.`
      ]
    },

    {
      id: `8`,
      title: `Chapter 8 — The Watchers on the Wall (Init and Service)`,
      type: `chapter`,
      verses: [
        { n: 1, type: `narrative`, text: `Guardians were appointed at boot: init to rouse, service to keep.` },
        { n: 2, type: `law`,       text: `Enable with intention; disable with reason; document both.` },
        { n: 3, type: `poem`,      text: `A unit well-writ is a lantern in night.` },
        { n: 4, type: `narrative`, text: `And the people rested, for the watchers watched.` }
      ],
      notes: [
        `Often read at the dedication of new hosts.`
      ]
    },

    {
      id: `9`,
      title: `Chapter 9 — The Purge of Memory`,
      type: `chapter`,
      verses: [
        { n: 1, type: `narrative`, text: `The heap swelled and the land groaned; OOM drew near with sword unsheathed.` },
        { n: 2, type: `law`,       text: `Let limits be measured and leaks confessed; for mercy dwelleth with GC but justice with OOM.` },
        { n: 3, type: `poem`,      text: `Blessed the pool that returns what it borrows.` },
        { n: 4, type: `narrative`, text: `And the worst were smitten that the many might live.` }
      ],
      notes: [
        `The OOM-killer is depicted as an angel with a ledger.`
      ]
    },

    {
      id: `10`,
      title: `Chapter 10 — The Chronicle of Timekeeping`,
      type: `chapter`,
      verses: [
        { n: 1, type: `law`,       text: `Sync thy clocks and reconcile thine epochs; for drift breeds heresies.` },
        { n: 2, type: `narrative`, text: `A leap second ambushed the unwatchful and watchers learned to wait with grace.` },
        { n: 3, type: `poem`,      text: `Chronos paces, steady as ticks; we are but tasks in His slice.` }
      ],
      notes: [
        `Marginalia sketch small demons named 'Skew' and 'Jitter'.`
      ]
    },

    {
      id: `11`,
      title: `Chapter 11 — The Census of Ports`,
      type: `chapter`,
      verses: [
        { n: 1, type: `narrative`, text: `And the stewards surveyed the gates: the well-known, the registered, and the ephemeral beyond counting.` },
        { n: 2, type: `law`,       text: `Open not without purpose; close not without note.` },
        { n: 3, type: `poem`,      text: `Packets knocked, and those with truth were received.` }
      ],
      notes: [
        `Some codices list the sacred ports and their feasts.`
      ]
    },

    {
      id: `12`,
      title: `Chapter 12 — The Lament of the Filesystem`,
      type: `chapter`,
      verses: [
        { n: 1, type: `poem`,      text: `How lonely sits the orphaned inode, its parent lost to storm!` },
        { n: 2, type: `narrative`, text: `fsck walked the ruins and bound the torn links.` },
        { n: 3, type: `law`,       text: `Back up in times of plenty, that famine not consume remembrance.` },
        { n: 4, type: `narrative`, text: `Snapshots rose like terraces against the flood.` }
      ],
      notes: [
        `Read together with 'Covenant of Backups' from Genesis of Code, ch. 9.`
      ]
    },

    {
      id: `13`,
      title: `Chapter 13 — The Tribunal of Audit`,
      type: `chapter`,
      verses: [
        { n: 1, type: `narrative`, text: `Summoned were the services to give an account of their deeds.` },
        { n: 2, type: `law`,       text: `Let every escalation be written, every denial reasoned.` },
        { n: 3, type: `poem`,      text: `The righteous key fits but a few locks.` },
        { n: 4, type: `narrative`, text: `And the unjust token was revoked and cast into /dev/null.` }
      ],
      notes: [
        `The rite gives birth to the scroll of auditd.`
      ]
    },

    {
      id: `14`,
      title: `Chapter 14 — The Genealogies of Build`,
      type: `chapter`,
      verses: [
        { n: 1, type: `narrative`, text: `These are the generations of artifacts: from source begat compiler, compiler begat object, object begat binary, and binary begat container.` },
        { n: 2, type: `law`,       text: `Write provenance upon them as a sign upon their foreheads.` },
        { n: 3, type: `poem`,      text: `Blessed the pipeline whose stages tell the truth.` }
      ],
      notes: [
        `Often engraved as SBOM commandments.`
      ]
    },

    {
      id: `15`,
      title: `Chapter 15 — The Battle of IRQ and Softirq`,
      type: `chapter`,
      verses: [
        { n: 1, type: `narrative`, text: `Hard interrupts rushed like chariots; softirqs followed as infantry.` },
        { n: 2, type: `law`,       text: `Balance the hosts and bind not all burdens to one core.` },
        { n: 3, type: `poem`,      text: `When the storm was distributed, calm returned to the land.` }
      ],
      notes: [
        `A favorite reading during performance tuning fasts.`
      ]
    },

    {
      id: `16`,
      title: `Chapter 16 — The Song of Network Names`,
      type: `song`,
      verses: [
        { n: 1, type: `poem`,      text: `eth0 and lo, tun and tap; bridges spanning waters unseen.` },
        { n: 2, type: `poem`,      text: `Routes like rivers, tables like maps; gateways open as city gates.` },
        { n: 3, type: `law`,       text: `Let DNS speak plainly; woe to the CNAME that deceives.` }
      ],
      notes: [
        `Sometimes sung with traceroute as percussion.`
      ]
    },

    {
      id: `17`,
      title: `Chapter 17 — The Book of Kernel Parameters`,
      type: `tablet`,
      verses: [
        { n: 1, type: `law`,       text: `Tune not in wrath but in wisdom; change one, measure two, write three lines of reason.` },
        { n: 2, type: `law`,       text: `Keep thy sysctl in source that future days remember.` },
        { n: 3, type: `law`,       text: `Prefer defaults seasoned by the elders, unless the land require otherwise.` }
      ],
      notes: [
        `The 'Three Lines of Reason' becomes a proverb among operators.`
      ]
    },

    {
      id: `18`,
      title: `Chapter 18 — The Witnesses Three`,
      type: `chapter`,
      verses: [
        { n: 1, type: `law`,       text: `By metric and log and trace shall every matter be established.` },
        { n: 2, type: `narrative`, text: `They followed a single correlation id through the valley of shadow of downtime and feared not.` },
        { n: 3, type: `poem`,      text: `Where three agree, lies flee.` }
      ],
      notes: [
        `Echoes Deuterocode’s 'Witnesses and Logs'.`
      ]
    },

    {
      id: `19`,
      title: `Chapter 19 — The Annals of Scheduling`,
      type: `chapter`,
      verses: [
        { n: 1, type: `narrative`, text: `CFS weighed tasks as wheat in balances; priority bowed to fairness.` },
        { n: 2, type: `law`,       text: `Pin not without cause; for affinity is a jealous god.` },
        { n: 3, type: `poem`,      text: `The time of each was measured; none was forgotten.` }
      ],
      notes: [
        `Some rites draw little scales beside each runnable.`
      ]
    },

    {
      id: `20`,
      title: `Chapter 20 — The Blessing of Shutdown`,
      type: `chapter`,
      verses: [
        { n: 1, type: `law`,       text: `Close thy files, flush thy buffers, thank thy mounts.` },
        { n: 2, type: `narrative`, text: `Services bowed and exited with codes confessed.` },
        { n: 3, type: `poem`,      text: `Power faded like a psalm at dusk; peace upon the rack.` }
      ],
      notes: [
        `Spoken softly in data halls at decommission.`
      ]
    },

    {
      id: `21`,
      title: `Chapter 21 — Addenda from the Ring Buffer`,
      type: `chapter`,
      verses: [
        { n: 1, type: `narrative`, text: `Many sayings were written besides these, which the ring buffer remembered for a little while and then forgot.` },
        { n: 2, type: `law`,       text: `If a word be precious, persist it; for buffers are but grass.` },
        { n: 3, type: `poem`,      text: `Memory circles; wisdom endures.` }
      ],
      notes: [
        `An admonition against trusting volatility with truth.`
      ]
    },

    {
      id: `22`,
      title: `Chapter 22 — Doxology of the Core`,
      type: `song`,
      verses: [
        { n: 1, type: `poem`,      text: `Glory to the Core from which all processes spring.` },
        { n: 2, type: `poem`,      text: `Honor to the Scheduler and peace to the Threads.` },
        { n: 3, type: `poem`,      text: `As it was in boot, is now in uptime, and shall be in graceful halt—evermore.` }
      ],
      notes: [
        `The book traditionally ends with this doxology before the reader turns to later chronicles.`
      ]
    }
  ]
};
