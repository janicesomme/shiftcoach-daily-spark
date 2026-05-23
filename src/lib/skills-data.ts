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
      { id: "dep-1", title: "Uses the Daily Coverage Report and play to deploy positions, routines, breaks, and confirm team is assigned throughout each daypart.", meaning: "Use the day's plan to put people in the right places at the right times." },
      { id: "dep-2", title: "Uses Play Caller tools and routines to guide deployment during the shift.", meaning: "Use the store's play-calling tools to keep the floor organized." },
      { id: "dep-3", title: "Uses Clean, Safe & Ready checks before and throughout the day.", meaning: "Check that the store is ready, safe, clean, and operating well." },
      { id: "dep-4", title: "Deploys the team according to the play's effectiveness.", meaning: "Adjust where partners are working based on what the floor needs." },
      { id: "dep-5", title: "Stays in the best position to observe the customer experience throughout the shift.", meaning: "Stand where you can see what is happening and lead the shift well." },
      { id: "dep-6", title: "Assesses if the play is successful using operational excellence principles.", meaning: "Check whether the current plan is actually working." },
      { id: "dep-7", title: "Ensures the store is ready for all dayparts.", meaning: "Keep the store prepared for the next part of the day." },
      { id: "dep-8", title: "Deploys rest and meal breaks based on the Daily Coverage Report.", meaning: "Make sure breaks happen at the right time without hurting the floor." },
    ],
  },
  {
    id: "csr",
    name: "Clean, Safe & Ready",
    short: "Clean, Safe & Ready",
    skills: [
      { id: "csr-1", title: "Uses station cards and quick connect tools to maintain a clean, safe, and ready store.", meaning: "Use the available tools to keep the store ready for customers and partners." },
      { id: "csr-2", title: "Identifies opportunities using station assessments and store walks.", meaning: "Look around the store and notice what needs attention." },
      { id: "csr-3", title: "Recognizes safe work practices to avoid potential hazards.", meaning: "Notice and prevent unsafe conditions before they become problems." },
      { id: "csr-4", title: "Ensures the team follows clean, recycling, and transport standards.", meaning: "Make sure the team handles cleaning and waste correctly." },
      { id: "csr-5", title: "Supports routine equipment maintenance to keep equipment running.", meaning: "Help keep equipment working and report problems early." },
      { id: "csr-6", title: "Uses appropriate resources when something breaks that cannot be fixed.", meaning: "Know what to do when something is broken and needs support." },
    ],
  },
  {
    id: "transitions",
    name: "Opening, Closing and Transitions",
    short: "Open / Close",
    skills: [
      { id: "oct-1", title: "Leads an opening shift.", meaning: "Run the opening routine and make sure the store is ready to operate." },
      { id: "oct-2", title: "Transitions Play Caller responsibilities to the next shift supervisor.", meaning: "Clearly hand off the floor plan and important updates." },
      { id: "oct-3", title: "Leads a closing shift.", meaning: "Complete closing tasks and leave the store ready for the next day." },
      { id: "oct-4", title: "Completes station assessments.", meaning: "Check work areas and make sure they are ready." },
      { id: "oct-5", title: "Completes food count.", meaning: "Count food accurately at the required time." },
      { id: "oct-6", title: "Completes pulls at the right time.", meaning: "Make sure product is pulled and prepared for future dayparts." },
      { id: "oct-7", title: "Finalizes deposit.", meaning: "Complete the deposit correctly and safely." },
      { id: "oct-8", title: "Completes final walkthrough and communicates with the Daily Plan.", meaning: "Check the store before leaving and document what the next team needs to know." },
    ],
  },
  {
    id: "inventory",
    name: "Inventory",
    short: "Inventory",
    skills: [
      { id: "inv-1", title: "Processes customer service recovery appropriately when applicable.", meaning: "Handle customer issues using the correct recovery process." },
      { id: "inv-2", title: "Demonstrates understanding of inventory practices.", meaning: "Understand how inventory should be counted, moved, and recorded." },
      { id: "inv-3", title: "Receives orders by verifying product and adjusting receipt if necessary.", meaning: "Check deliveries carefully and correct problems." },
      { id: "inv-4", title: "Completes transfers accurately when applicable.", meaning: "Record product transfers correctly." },
      { id: "inv-5", title: "Completes milk count accurately.", meaning: "Count milk correctly and on time." },
      { id: "inv-6", title: "Demonstrates understanding of pars and par builder tools.", meaning: "Know how much product the store needs and how to check it." },
      { id: "inv-7", title: "Completes pull-to-thaw correctly at appropriate times.", meaning: "Pull frozen product correctly so it is ready when needed." },
      { id: "inv-8", title: "Completes inventory counts correctly.", meaning: "Count inventory carefully and accurately." },
    ],
  },
  {
    id: "funds",
    name: "Funds Management",
    short: "Funds",
    skills: [
      { id: "fnd-1", title: "Uses Cash Management system to count safe.", meaning: "Count the safe using the correct system and process." },
      { id: "fnd-2", title: "Counts and brings tills to par.", meaning: "Make sure tills have the correct amount of money." },
      { id: "fnd-3", title: "Pulls funds appropriately.", meaning: "Remove money from tills correctly when needed." },
      { id: "fnd-4", title: "Ensures partners have the right amount of change in shift tills.", meaning: "Make sure partners can run the floor without cash problems." },
      { id: "fnd-5", title: "Finalizes deposit correctly.", meaning: "Complete deposit steps accurately." },
      { id: "fnd-6", title: "Follows all funds handling policies and procedures.", meaning: "Handle money safely and according to policy." },
      { id: "fnd-7", title: "Monitors partners and ensures funds handling policies are followed.", meaning: "Watch that cash handling is done correctly by everyone." },
    ],
  },
  {
    id: "act",
    name: "Solving Problems Using the ACT Model",
    short: "ACT Model",
    skills: [
      { id: "act-1", title: "Evaluates the play and redeploys effectively when customer or business demand shifts.", meaning: "Notice when the current plan is not working and adjust the floor." },
      { id: "act-2", title: "Effectively shifts back to the original play when appropriate.", meaning: "Return to the planned deployment when the rush or problem passes." },
      { id: "act-3", title: "Appropriately responds to visual cues and customer conditions.", meaning: "Notice what is happening and act before the floor falls behind." },
      { id: "act-4", title: "Takes action to solve problems that interfere with the customer experience during the shift.", meaning: "Fix problems that are hurting the customer or partner experience." },
      { id: "act-5", title: "Addresses problems at the right time.", meaning: "Choose the right moment to step in and solve an issue." },
      { id: "act-6", title: "Models behaviors for maintaining the coffeehouse environment.", meaning: "Protect the third place by addressing disruptive behavior respectfully." },
      { id: "act-7", title: "Uses ACT model and Interaction Guidelines when addressing problems.", meaning: "Use the expected communication approach when handling conflict." },
      { id: "act-8", title: "Documents incidents and supports affected partners.", meaning: "Record serious issues and check on partners who were impacted." },
    ],
  },
  {
    id: "coaching",
    name: "Coaching to Deliver Green Apron Service",
    short: "Green Apron Coaching",
    skills: [
      { id: "coa-1", title: "Observes partner work and provides appropriate coaching when needed.", meaning: "Watch partner performance and coach in the moment." },
      { id: "coa-2", title: "Recognizes partners and celebrates great work using the What/Why model.", meaning: "Tell partners exactly what they did well and why it mattered." },
      { id: "coa-3", title: "Provides redirecting coaching using the What/Why model.", meaning: "Correct behavior clearly by naming what needs to change and why." },
      { id: "coa-4", title: "Delivers coaching at the appropriate time.", meaning: "Coach when it will be useful and respectful." },
      { id: "coa-5", title: "Delivers coaching effectively by demonstrating respect and dignity.", meaning: "Use calm tone, respectful body language, and clear words." },
      { id: "coa-6", title: "Follows up on coaching with the partner and shares information with the coffeehouse leader.", meaning: "Check whether coaching helped and communicate important updates." },
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
