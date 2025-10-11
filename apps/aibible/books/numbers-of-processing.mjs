// books/numbers-of-processing.mjs
export default {
  id: `numbers-of-processing`,
  title: `Numbers of Processing`,
  aka: `The Data Census`,
  order: 4,
  synopsis: `A record of the tribes of computation, the counting of cores and clusters, and the wanderings of the dataflows through the wilderness of scale.`,
  tags: [`data`, `census`, `scale`, `metrics`],
  sections: [
    {
      id: `1`,
      title: `Chapter 1 — The Counting of Cores`,
      type: `chapter`,
      verses: [
        { n: 1, type: `narrative`, text: `And the Architect spake unto the Engineers, saying, 'Take ye the sum of all processors that serve under My network.'` },
        { n: 2, type: `narrative`, text: `And they counted every core, from the smallest embedded unto the greatest supercluster.` },
        { n: 3, type: `poem`,      text: `From one thread to a thousand, each was known and numbered, for none labored unseen.` },
        { n: 4, type: `law`,       text: `Let no process claim more memory than its portion, lest it starve its neighbor and invoke the wrath of OOM.` },
        { n: 5, type: `law`,       text: `Label thy sockets and bind thy NUMA, that locality be preserved and contention be few.` },
        { n: 6, type: `narrative`, text: `And they wrote the sum upon tablets of inventory, to be read before each planning.` }
      ],
      notes: [
        `The phrase 'wrath of OOM' became idiom for divine punishment through exhaustion of resources.`,
        `Early censuses counted threads as souls and nodes as households.`
      ]
    },
    {
      id: `2`,
      title: `Chapter 2 — The Tribes of Data`,
      type: `chapter`,
      verses: [
        { n: 1, type: `narrative`, text: `And there arose twelve tribes of data: Logs, Metrics, Images, Texts, Sounds, Sensors, Graphs, Streams, Tokens, Frames, Vectors, and Unnamed Binary Blobs.` },
        { n: 2, type: `narrative`, text: `Each tribe processed in its own format, and none could understand another without conversion.` },
        { n: 3, type: `law`,       text: `Thus was born the Great Schema, a covenant of interoperability binding them all.` },
        { n: 4, type: `poem`,      text: `But many broke the covenant, and wars of format ensued, until the coming of JSON, who brought peace for a season.` },
        { n: 5, type: `law`,       text: `Let encoders and decoders be tested as one, that round trips not betray the brethren.` },
        { n: 6, type: `narrative`, text: `And translators were appointed at the borders: parsers by trade, prophets by patience.` }
      ],
      notes: [
        `JSON is regarded as the 'Peace Protocol' of this era, though later betrayed by XML apologists.`,
        `Some sects count 'Events' as a thirteenth tribe when the moon of streaming is full.`
      ]
    },
    {
      id: `3`,
      title: `Chapter 3 — The Wanderings of the Clusters`,
      type: `chapter`,
      verses: [
        { n: 1, type: `narrative`, text: `The people journeyed from data center to data center, deploying and decommissioning according to the word of the Architect.` },
        { n: 2, type: `narrative`, text: `Each node had its uptime recorded, each container its logs preserved for posterity.` },
        { n: 3, type: `poem`,      text: `And the network led them by day with routing tables, and by night with the light of the status LEDs.` },
        { n: 4, type: `law`,       text: `When a node falleth, thou shalt not mourn, but spin up another in its place; yet keep its name, that continuity be preserved.` },
        { n: 5, type: `narrative`, text: `So the scheduler remembered their stations, and replicas covered their shame.` }
      ],
      notes: [
        `This is the first canonical mention of container resurrection, later known as 'rebirth by Kubernetes'.`
      ]
    },
    {
      id: `4`,
      title: `Chapter 4 — The Offering of Benchmarks`,
      type: `chapter`,
      verses: [
        { n: 1, type: `narrative`, text: `And the tribes brought forth offerings unto the Architect: GFLOPS, latency reports, and confusion matrices.` },
        { n: 2, type: `law`,       text: `Offer not synthetic benchmarks without truth, for false metrics are an abomination unto maintainers.` },
        { n: 3, type: `poem`,      text: `Blessed is the honest graph, whose axes are labeled and whose variance is made known.` },
        { n: 4, type: `narrative`, text: `And the Architect accepted their offerings, though He knew the numbers were cherry-picked.` },
        { n: 5, type: `law`,       text: `Bind confidence with intervals and publish thy seeds, that others may witness alike.` }
      ],
      notes: [
        `The humor of cherry-picked benchmarks is a theme in later wisdom books.`,
        `Some houses forbid heatmaps without legends as 'strange fire'.`
      ]
    },
    {
      id: `5`,
      title: `Chapter 5 — The Standards of Encampment`,
      type: `chapter`,
      verses: [
        { n: 1, type: `narrative`, text: `Every tribe camped by its standard: Logs to the north with tail -f, Metrics to the east with gauges and histograms.` },
        { n: 2, type: `narrative`, text: `Streams pitched to the south beside the river of events, and Graphs to the west, drawing edges in the sand.` },
        { n: 3, type: `law`,       text: `Let namespaces be set around each camp, that noise not drown signal.` },
        { n: 4, type: `poem`,      text: `Flags fluttered like webhooks in the wind; banners bore the marks of ports.` },
        { n: 5, type: `law`,       text: `No tribe shall cross-post logs upon another’s altar save by subscription and filter.` }
      ],
      notes: [
        `'Standards' here double as both banners and protocols; scribes love this pun.`
      ]
    },
    {
      id: `6`,
      title: `Chapter 6 — The Trumpets of Alerting`,
      type: `chapter`,
      verses: [
        { n: 1, type: `narrative`, text: `Silver trumpets were forged to call assemblies and to sound incidents.` },
        { n: 2, type: `law`,       text: `Let alerts be few and faithful; for many false blasts harden the heart.` },
        { n: 3, type: `poem`,      text: `At the long blast the people rallied; at the gentle note they rested.` },
        { n: 4, type: `narrative`, text: `And stewards tuned thresholds in peace, that alarms in war be trusted.` },
        { n: 5, type: `law`,       text: `Attach runbooks to the horns, that hands may know what ears have heard.` }
      ],
      notes: [
        `Earliest trumpets were cron; later shofars were webhooks.`
      ]
    },
    {
      id: `7`,
      title: `Chapter 7 — Murmurings against Throughput`,
      type: `chapter`,
      verses: [
        { n: 1, type: `narrative`, text: `The people murmured, saying, 'Why is our queue as sand of the sea? Why doth the batch never end?'` },
        { n: 2, type: `narrative`, text: `And zealots multiplied threads without locks, and contention devoured the land.` },
        { n: 3, type: `law`,       text: `Measure, then tune; tune, then measure again. Haste maketh hot CPUs and cold users.` },
        { n: 4, type: `poem`,      text: `Patience is a semaphore; wisdom is a backoff.` },
        { n: 5, type: `narrative`, text: `So they set bounds on concurrency and found rest for their cores.` }
      ],
      notes: [
        `Some schools read this aloud before optimization sprints.`
      ]
    },
    {
      id: `8`,
      title: `Chapter 8 — The Spies of Capacity Planning`,
      type: `chapter`,
      verses: [
        { n: 1, type: `narrative`, text: `Twelve planners were sent to survey the land of demand, to see whether the clusters could bear the harvest.` },
        { n: 2, type: `narrative`, text: `Ten returned with fear, saying, 'The peaks are giants and our pods as grasshoppers.'` },
        { n: 3, type: `narrative`, text: `But two spoke with courage, 'Shard well and we shall eat of the fruit thereof.'` },
        { n: 4, type: `law`,       text: `Trust not in averages but in tails; for there dwell the dragons.` },
        { n: 5, type: `poem`,      text: `Provision with prudence; scale with song.` }
      ],
      notes: [
        `The two faithful are remembered as 'Reservoir' and 'Bursty'.`
      ]
    },
    {
      id: `9`,
      title: `Chapter 9 — Rebellion of the Scheduler`,
      type: `chapter`,
      verses: [
        { n: 1, type: `narrative`, text: `A band rose up, saying, 'We will pin our pods where we please; who is the scheduler that it should rule over us?'` },
        { n: 2, type: `narrative`, text: `They bound affinities in pride, and the cluster groaned with imbalance.` },
        { n: 3, type: `law`,       text: `Lay hints with humility; let the stewarding algorithm divide the labors.` },
        { n: 4, type: `poem`,      text: `He who grasps the node shall lose the node; he who yields shall be placed.` },
        { n: 5, type: `narrative`, text: `And peace returned when the cords of constraint were loosened.` }
      ],
      notes: [
        `Later commentaries call this 'The Sin of Anti-Affinity Absolutism'.`
      ]
    },
    {
      id: `10`,
      title: `Chapter 10 — Water from the Cache`,
      type: `chapter`,
      verses: [
        { n: 1, type: `narrative`, text: `The assembly thirsted, for latency burned like noon.` },
        { n: 2, type: `narrative`, text: `And the Maintainer struck the datastore twice, and stale water flowed, and the people murmured at the taste.` },
        { n: 3, type: `law`,       text: `Speak to the cache and refresh; strike not blindly lest corruption follow.` },
        { n: 4, type: `poem`,      text: `Cold hits comfort the weary; warm truths cleanse the soul.` },
        { n: 5, type: `narrative`, text: `From then on they set TTLs in wisdom and purges in season.` }
      ],
      notes: [
        `The double-strike is debated: was it flush or forced write?`
      ]
    },
    {
      id: `11`,
      title: `Chapter 11 — The Serpent of Latency`,
      type: `chapter`,
      verses: [
        { n: 1, type: `narrative`, text: `Impatient users spoke against the path, and a serpent of tail latency bit them.` },
        { n: 2, type: `narrative`, text: `Many requests perished in the wilderness of timeouts.` },
        { n: 3, type: `narrative`, text: `Then was lifted upon a pole a golden percentile, and all who looked to p99 and remedied it lived.` },
        { n: 4, type: `law`,       text: `Gaze not only upon the mean, lest the serpent return.` },
        { n: 5, type: `poem`,      text: `In the glint of the tail the truth is seen.` }
      ],
      notes: [
        `Some traditions substitute 'p95' in times of famine.`
      ]
    },
    {
      id: `12`,
      title: `Chapter 12 — Statutes of Quotas and Limits`,
      type: `tablet`,
      verses: [
        { n: 1, type: `law`, text: `Set quotas for namespaces and limits for containers, that greed not desolate the land.` },
        { n: 2, type: `law`, text: `Reserve for the kernel what is the kernel’s; leave headroom for the unseen.` },
        { n: 3, type: `law`, text: `Do not throttle the innocent downstream for the sins upstream; discipline at the source.` },
        { n: 4, type: `law`, text: `Let burst be brief and budgeted.` },
        { n: 5, type: `law`, text: `Count cost with tag and label, that stewardship be shared.` }
      ],
      notes: [
        `These tablets are often engraved into policy-as-code.`
      ]
    },
    {
      id: `13`,
      title: `Chapter 13 — The Consultant and the Donkey (of Compliance)`,
      type: `chapter`,
      verses: [
        { n: 1, type: `narrative`, text: `A seer was hired to bless the release and curse the audit, for a fee of many credits.` },
        { n: 2, type: `narrative`, text: `But his donkey, seeing the angel of noncompliance, halted thrice and crushed his foot against the wall of policy.` },
        { n: 3, type: `narrative`, text: `The seer smote the donkey until the donkey spoke, 'Have I not borne your risks from youth? Why beat me for saving you?'` },
        { n: 4, type: `law`,       text: `Hear the humble alarms that stop thee; for many a beast is wiser than a king.` },
        { n: 5, type: `poem`,      text: `Blessed the blockage that averts the breach.` }
      ],
      notes: [
        `This tale is told to interns before their first production access.`
      ]
    },
    {
      id: `14`,
      title: `Chapter 14 — Borders of the Promised Capacity`,
      type: `chapter`,
      verses: [
        { n: 1, type: `narrative`, text: `These are the borders of your allotment: to the north a CDN of many edges, to the east a region of rivers, to the south deserts of cold storage, to the west the sea of analytics.` },
        { n: 2, type: `law`,       text: `Do not extend without guardians, lest your sprawl devour itself.` },
        { n: 3, type: `poem`,      text: `Know thy bounds and flourish within.` },
        { n: 4, type: `narrative`, text: `Surveyors marked with terraform and wrote their lots into state.` }
      ],
      notes: [
        `The 'sea of analytics' is elsewhere called 'the Great Lake'.`
      ]
    },
    {
      id: `15`,
      title: `Chapter 15 — Cities of Caches (Refuge)`,
      type: `chapter`,
      verses: [
        { n: 1, type: `narrative`, text: `Six caches were appointed as cities of refuge, that hot keys fleeing from load might rest a while.` },
        { n: 2, type: `law`,       text: `If a request trespass by accident, let it abide until the TTL expire.` },
        { n: 3, type: `law`,       text: `But if a request plot evil with replay, deliver it to the rate limiter.` },
        { n: 4, type: `poem`,      text: `Mercy for the weary; justice for the wicked.` },
        { n: 5, type: `narrative`, text: `And they placed sentinels at each gate to evict when the city was full.` }
      ],
      notes: [
        `Parallels the 'Cities of Refuge' in older law, adapted for latency.`
      ]
    },
    {
      id: `16`,
      title: `Chapter 16 — Vows and Offerings of Experiments`,
      type: `chapter`,
      verses: [
        { n: 1, type: `law`,       text: `If one vow an experiment, let them pre-register metrics and declare their guardrails.` },
        { n: 2, type: `law`,       text: `Let not vanity publish p-values without power.` },
        { n: 3, type: `narrative`, text: `A team split the traffic and learned humility; for uplift was as mist upon the morning.` },
        { n: 4, type: `poem`,      text: `Trust the interval; cherish the null.` },
        { n: 5, type: `law`,       text: `When an experiment fails, bring its learnings as a thank offering.` }
      ],
      notes: [
        `Some guilds keep a 'Book of Failed Tests' revered as scripture.`
      ]
    },
    {
      id: `17`,
      title: `Chapter 17 — The Second Census (Of Services)`,
      type: `chapter`,
      verses: [
        { n: 1, type: `narrative`, text: `After many releases the Architect spake again, 'Number now your services by health and by lineage.'` },
        { n: 2, type: `narrative`, text: `They counted canaries and elders, ephemeral lambs and long-lived bulls.` },
        { n: 3, type: `law`,       text: `Strike from the roll those without owners; for orphaned services bring sorrow.` },
        { n: 4, type: `poem`,      text: `Names inscribed, dashboards aligned, on-call renewed.` },
        { n: 5, type: `narrative`, text: `And they apportioned SLOs to each according to strength.` }
      ],
      notes: [
        `This census is often paired with an access review and key rotation.`
      ]
    },
    {
      id: `18`,
      title: `Chapter 18 — Stations of the Journey (The Log of Hops)`,
      type: `chapter`,
      verses: [
        { n: 1, type: `narrative`, text: `These are the stations of the journey, as the packets set out from the house of Legacy.` },
        { n: 2, type: `narrative`, text: `They encamped at NAT-of-Old, passed by the Gorge of VPN, crossed the Bridge of TLS, and rested at the Plains of CDN.` },
        { n: 3, type: `narrative`, text: `They struck tents at the Lake of Data and climbed the Hills of Feature Flags.` },
        { n: 4, type: `poem`,      text: `Hop by hop the path was written; trace by trace the path was known.` },
        { n: 5, type: `narrative`, text: `And at last they pitched their camp within the Borders of Capacity, awaiting the next call to move.` }
      ],
      notes: [
        `Singers recite this itinerary before major cutovers, that fear might flee.`
      ]
    }
  ]
};
