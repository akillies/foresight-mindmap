const fs = require('fs');

const fixes = [
  {
    old: "description: 'Systematic exploration across STEEP domains',",
    new: "description: 'Systematic environmental monitoring across STEEP domains (Social, Technological, Economic, Environmental, Political) to detect trends, signals, and emerging changes',"
  },
  {
    old: "description: 'Early indicators of potential future change',",
    new: "description: 'Faint early indicators of potential disruption detected at the periphery before they amplify into mainstream trends or crises',"
  },
  {
    old: "description: 'Recurring patterns in history and society',",
    new: "description: 'Identification and analysis of recurring temporal patterns, cycles, and rhythms in history, economics, demographics, and social change',"
  },
  {
    old: "description: 'Four-layer deconstruction from litany to myth',",
    new: "description: 'Four-layer depth analysis examining litany (events), systems (structures), worldviews (discourses), and myths (metaphors) underlying current and alternative futures',"
  },
  {
    old: "description: 'Examining language, power structures, and narrative frames',",
    new: "description: 'Critical examination of language, narratives, and communication patterns that shape how futures are imagined and whose visions are privileged',"
  },
  {
    old: "description: 'Developing multiple plausible futures across key uncertainties',",
    new: "description: 'Development of multiple plausible divergent future narratives to explore uncertainties, test strategies, and challenge assumptions in complex environments',"
  },
  {
    old: "description: 'Low-probability high-impact events',",
    new: "description: 'Low-probability high-impact events (Black Swans) that could radically disrupt current trajectories and fundamentally reshape the future if they occurred',"
  },
  {
    old: "description: 'Systematic exploration of solution space',",
    new: "description: 'Systematic exploration of all possible combinations of solution parameters to map the complete morphological field of potential futures',"
  },
  {
    old: "description: 'Structured expert consensus building through iterative rounds',",
    new: "description: 'Structured expert consensus forecasting process using iterative anonymous surveys with controlled feedback to converge on probabilistic predictions',"
  },
  {
    old: "description: 'Creating shared images of futures',",
    new: "description: 'Participatory co-creation of shared aspirational images of desired futures to guide strategic action and motivate transformative change',"
  }
];

let content = fs.readFileSync('src/mindMapData.js', 'utf8');
let count = 0;

fixes.forEach((fix, i) => {
  if (content.includes(fix.old)) {
    content = content.replace(fix.old, fix.new);
    count++;
    console.log(`✅ ${i+1}. Applied`);
  } else {
    console.log(`❌ ${i+1}. Not found:`, fix.old.substring(0, 50) + '...');
  }
});

fs.writeFileSync('src/mindMapData.js', content);
console.log(`\n✅ Applied ${count}/10 description expansions`);
