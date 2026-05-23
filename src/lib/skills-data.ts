export type Skill = {
  id: string;
  title: string;
  meaning: string;
};

export type Category = {
  id: string;
  name: string;
  short: string;
  skills: Skill[];
};

export const CATEGORIES: Category[] = [
  {
    id: "deployment",
    name: "Deployment",
    short: "Deployment",
    skills: [
      { id: "dep-1", title: "Uses the Daily Coverage Report and play to deploy positions, routines, breaks, and confirm team is assigned throughout each daypart.", meaning: "Before and during the shift, check the Daily Coverage Report and floor play so each partner is assigned to the right station, breaks are planned, and the team is adjusted as business changes." },
      { id: "dep-2", title: "Uses Play Caller tools and routines to guide deployment during the shift.", meaning: "Use the Play Caller routine to keep track of what needs to happen next, who is where, and whether the team needs to be moved to support customers better." },
      { id: "dep-3", title: "Uses Clean, Safe & Ready checks before and throughout the day.", meaning: "Look around the store before and during the shift to catch anything that could affect cleanliness, safety, speed, product quality, or the customer experience." },
      { id: "dep-4", title: "Deploys the team according to the play's effectiveness.", meaning: "Watch whether the current deployment is actually working. If the line, drive thru, cafe, mobile orders, or partners are struggling, move people or change the play." },
      { id: "dep-5", title: "Stays in the best position to observe the customer experience throughout the shift.", meaning: "Position yourself where you can see the floor, notice problems early, support partners, and protect the customer experience instead of getting buried in one task." },
      { id: "dep-6", title: "Assesses if the play is successful using operational excellence principles.", meaning: "Check whether the shift is running smoothly by looking at speed, cleanliness, partner flow, customer wait, product quality, and whether partners know what they are doing." },
      { id: "dep-7", title: "Ensures the store is ready for all dayparts.", meaning: "Think ahead to the next part of the day. Make sure product, people, breaks, cleaning, and handoff information are ready before the shift changes." },
      { id: "dep-8", title: "Deploys rest and meal breaks based on the Daily Coverage Report.", meaning: "Use the Daily Coverage Report to plan breaks so partners get them on time without leaving the floor short during busy periods." },
    ],
  },
  {
    id: "csr",
    name: "Clean, Safe & Ready",
    short: "Clean, Safe & Ready",
    skills: [
      { id: "csr-1", title: "Uses station cards and quick connect tools to maintain a clean, safe, and ready store.", meaning: "Use the station cards and quick checks to make sure each area is stocked, clean, safe, and ready for partners to work efficiently." },
      { id: "csr-2", title: "Identifies opportunities using station assessments and store walks.", meaning: "Walk the store with intention. Look for what is empty, dirty, unsafe, out of place, slowing partners down, or hurting the customer experience." },
      { id: "csr-3", title: "Recognizes safe work practices to avoid potential hazards.", meaning: "Notice risks before they become incidents, such as spills, blocked paths, unsafe stacking, hot surfaces, sharp items, or partners rushing unsafely." },
      { id: "csr-4", title: "Ensures the team follows clean, recycling, and transport standards.", meaning: "Watch that partners are cleaning, moving items, handling trash, and recycling in the correct way so the store stays safe and inspection-ready." },
      { id: "csr-5", title: "Supports routine equipment maintenance to keep equipment running.", meaning: "Pay attention to equipment performance, follow routine care steps, and respond early when something seems off instead of waiting for it to fully break." },
      { id: "csr-6", title: "Uses appropriate resources when something breaks that cannot be fixed.", meaning: "When equipment or store conditions cannot be fixed immediately, use the right reporting or support process and communicate the issue clearly." },
    ],
  },
  {
    id: "transitions",
    name: "Opening, Closing and Transitions",
    short: "Open / Close",
    skills: [
      { id: "oct-1", title: "Leads an opening shift.", meaning: "Set up the store, partners, product, routines, and priorities so the day starts organized and the team knows what matters first." },
      { id: "oct-2", title: "Transitions Play Caller responsibilities to the next shift supervisor.", meaning: "Give the next supervisor a clear handoff: current floor setup, breaks, staffing, product issues, customer issues, tasks still open, and anything urgent." },
      { id: "oct-3", title: "Leads a closing shift.", meaning: "Guide the team through closing tasks, cleaning, money, inventory, restocking, and final checks so the next day starts strong." },
      { id: "oct-4", title: "Completes station assessments.", meaning: "Check each work area for readiness, cleanliness, stocking, safety, and anything that could slow the team down later." },
      { id: "oct-5", title: "Completes food count.", meaning: "Complete the food count accurately and on time so the store has reliable information for product planning and waste control." },
      { id: "oct-6", title: "Completes pulls at the right time.", meaning: "Make sure product is pulled when needed so future dayparts have what they need without scrambling or running short." },
      { id: "oct-7", title: "Finalizes deposit.", meaning: "Complete the deposit carefully, accurately, and according to policy so funds are secure and the close is complete." },
      { id: "oct-8", title: "Completes final walkthrough and communicates with the Daily Plan.", meaning: "Before leaving, walk the store, check what is unfinished, and leave clear notes so the next team knows what happened and what needs attention." },
    ],
  },
  {
    id: "inventory",
    name: "Inventory",
    short: "Inventory",
    skills: [
      { id: "inv-1", title: "Processes customer service recovery appropriately when applicable.", meaning: "When a customer issue needs recovery, handle it calmly, make the moment right, and use the correct process so the issue is documented properly." },
      { id: "inv-2", title: "Demonstrates understanding of inventory practices.", meaning: "Show that you understand how product is counted, received, pulled, transferred, stored, and tracked so the store can operate without surprises." },
      { id: "inv-3", title: "Receives orders by verifying product and adjusting receipt if necessary.", meaning: "When deliveries arrive, check that the right products and amounts were received and correct anything that does not match." },
      { id: "inv-4", title: "Completes transfers accurately when applicable.", meaning: "If product is moved between stores or locations, record it correctly so inventory stays accurate." },
      { id: "inv-5", title: "Completes milk count accurately.", meaning: "Count milk carefully and at the correct time so ordering and product planning are based on real numbers." },
      { id: "inv-6", title: "Demonstrates understanding of pars and par builder tools.", meaning: "Use par information to understand how much product the store should have and whether current levels are too high, too low, or on track." },
      { id: "inv-7", title: "Completes pull-to-thaw correctly at appropriate times.", meaning: "Pull frozen product at the right time and in the right amount so it is ready when needed and waste is controlled." },
      { id: "inv-8", title: "Completes inventory counts correctly.", meaning: "Count inventory carefully, avoid guessing, and make sure numbers reflect what is actually in the store." },
    ],
  },
  {
    id: "funds",
    name: "Funds Management",
    short: "Funds",
    skills: [
      { id: "fnd-1", title: "Uses Cash Management system to count safe.", meaning: "Use the cash system correctly when counting the safe so the money is accurate and any difference can be caught quickly." },
      { id: "fnd-2", title: "Counts and brings tills to par.", meaning: "Make sure each till has the correct starting amount so partners can serve customers without cash problems." },
      { id: "fnd-3", title: "Pulls funds appropriately.", meaning: "Remove money from tills at the right time and in the correct way so cash levels stay safe and manageable." },
      { id: "fnd-4", title: "Ensures partners have the right amount of change in shift tills.", meaning: "Check that partners have enough change to keep the floor moving without interrupting service." },
      { id: "fnd-5", title: "Finalizes deposit correctly.", meaning: "Complete deposit steps carefully, double-check accuracy, and follow policy so the close or handoff is clean." },
      { id: "fnd-6", title: "Follows all funds handling policies and procedures.", meaning: "Handle cash, tills, safe counts, deposits, and pulls exactly according to policy to protect yourself, partners, and the store." },
      { id: "fnd-7", title: "Monitors partners and ensures funds handling policies are followed.", meaning: "Watch that partners are handling cash correctly and step in if something needs to be corrected or clarified." },
    ],
  },
  {
    id: "act",
    name: "Solving Problems Using the ACT Model",
    short: "ACT Model",
    skills: [
      { id: "act-1", title: "Evaluates the play and redeploys effectively when customer or business demand shifts.", meaning: "When the floor changes, such as a rush, callout, backed-up channel, or partner struggle, adjust the play instead of hoping it fixes itself." },
      { id: "act-2", title: "Effectively shifts back to the original play when appropriate.", meaning: "After the rush or problem passes, reset the floor so partners are not stuck in an emergency deployment longer than needed." },
      { id: "act-3", title: "Appropriately responds to visual cues and customer conditions.", meaning: "Watch the store for clues: long waits, dirty areas, confused customers, backed-up drinks, low product, partner stress, or bottlenecks." },
      { id: "act-4", title: "Takes action to solve problems that interfere with the customer experience during the shift.", meaning: "When something is hurting the customer experience, act quickly, communicate clearly, and remove the obstacle." },
      { id: "act-5", title: "Addresses problems at the right time.", meaning: "Decide whether to act immediately, wait for a calmer moment, or follow up later so the issue is handled effectively and respectfully." },
      { id: "act-6", title: "Models behaviors for maintaining the coffeehouse environment.", meaning: "Set the tone for the store by staying calm, respectful, welcoming, and aware of anything that affects the third place environment." },
      { id: "act-7", title: "Uses ACT model and Interaction Guidelines when addressing problems.", meaning: "When handling a problem, communicate clearly and respectfully, focus on the behavior or situation, and work toward a practical solution." },
      { id: "act-8", title: "Documents incidents and supports affected partners.", meaning: "If something serious happens, document what happened, communicate it appropriately, and check on partners who were affected." },
    ],
  },
  {
    id: "coaching",
    name: "Coaching to Deliver Green Apron Service",
    short: "Green Apron Coaching",
    skills: [
      { id: "coa-1", title: "Observes partner work and provides appropriate coaching when needed.", meaning: "Watch partners in real moments and coach when you see something that should be repeated, improved, corrected, or clarified." },
      { id: "coa-2", title: "Recognizes partners and celebrates great work using the What/Why model.", meaning: "Look for specific partner wins, name exactly what they did well, and explain why it mattered to the team, customer, or shift." },
      { id: "coa-3", title: "Provides redirecting coaching using the What/Why model.", meaning: "When something needs to change, calmly name what happened, explain why it matters, and give a clear next step." },
      { id: "coa-4", title: "Delivers coaching at the appropriate time.", meaning: "Choose a coaching moment that helps the partner learn without embarrassing them or disrupting the floor unnecessarily." },
      { id: "coa-5", title: "Delivers coaching effectively by demonstrating respect and dignity.", meaning: "Use calm words, respectful tone, and supportive body language so coaching feels clear and fair rather than personal or harsh." },
      { id: "coa-6", title: "Follows up on coaching with the partner and shares information with the coffeehouse leader.", meaning: "Check whether the coaching helped, notice improvement, and pass along important information to the store leader when needed." },
    ],
  },
];

export const ALL_SKILLS: (Skill & { categoryId: string; categoryName: string })[] =
  CATEGORIES.flatMap((c) =>
    c.skills.map((s) => ({ ...s, categoryId: c.id, categoryName: c.name }))
  );

export function getSkill(id: string) {
  return ALL_SKILLS.find((s) => s.id === id);
}

export function getCategory(id: string) {
  return CATEGORIES.find((c) => c.id === id);
}
