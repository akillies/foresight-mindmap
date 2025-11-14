#!/bin/bash

# This script applies all remaining content fixes

FILE="/Users/adminster/foresight/foresight-mindmap/src/mindMapData.js"

echo "Applying content fixes..."

# Fix Delphi overview (lines around 2295-2297)
sed -i '' "s|overview: 'Delphi method uses iterative expert surveys with controlled feedback to build forecasting consensus\.',|overview: 'The Delphi Method, developed at RAND Corporation in the 1950s by Olaf Helmer and Norman Dalkey, is a structured forecasting technique that builds expert consensus through iterative rounds of anonymous surveys with controlled feedback. Designed to overcome the pitfalls of traditional expert panels (groupthink, dominance by loud voices, pressure to conform), Delphi allows experts to revise their judgments after seeing aggregated group responses without knowing individual opinions. The process typically involves 2-4 rounds: experts provide initial forecasts, receive statistical summary of group responses, reflect on divergence from their own views, and revise estimates. The method is particularly valuable for long-term forecasting (10-30 years) where historical data is limited, for complex socio-technical systems with many interacting factors, and when expert judgment must substitute for empirical evidence. Delphi has been widely used for technology forecasting, policy planning, and strategic foresight.',|g" "$FILE"

# Fix Visioning overview (lines around 2609-2611)
sed -i '' "s|overview: 'Visioning creates shared images of preferred futures to guide action\.',|overview: 'Visioning, formalized by Elise Boulding and others in the 1980s-90s, is a participatory process for creating shared, compelling images of desired futures that guide strategic action toward transformation. Unlike forecasting (which extrapolates trends) or scenario planning (which explores multiple possibilities), visioning asks \"what do we want?\" and uses imagination to articulate aspirational futures that motivate change. The process typically engages diverse stakeholders in facilitated workshops using techniques like \"imaging the future\" (mentally stepping into a preferred future and describing it in present tense), visual mapping, and narrative storytelling. Effective visions are positive and aspirational (not problem-focused), concrete and vivid (not abstract), inclusive (reflecting diverse values), and actionable (guiding strategy). Visioning is particularly powerful for communities, organizations, and movements seeking transformative change rather than incremental improvement, creating emotional connection and shared ownership of preferred futures.',|g" "$FILE"

# Fix Backcasting overview (lines around 2721-2723)
sed -i '' "s|overview: 'Backcasting works backward from desired future to identify pathways\.',|overview: 'Backcasting, pioneered by John Robinson in the 1980s for energy and sustainability planning, is a strategic planning method that works backward from a defined desirable future to identify pathways and actions needed to reach it. Unlike forecasting (which projects current trends forward) or scenario planning (which explores multiple possibilities), backcasting begins with normative goal-setting: \"What future do we want?\" and then asks \"How do we get there?\" The process defines a specific future state (typically 15-30 years out), describes it in detail, and then traces logical steps backward to the present, identifying necessary changes, decision points, and interventions along the way. Backcasting is especially valuable when: current trends are undesirable and must be disrupted, the problem is complex and requires systemic change, the goal is ambitious and transformative, or dominant interests resist change. It has been widely applied to climate strategy, sustainable cities, and technology transitions.',|g" "$FILE"

# Fix Aspirational Futures overview (lines around 3015-3017)
sed -i '' "s|overview: 'Aspirational futures imagine radically optimistic post-scarcity societies through technology and collaboration\.',|overview: 'Aspirational Futures Design, inspired by Gene Roddenberry'"'"'s Star Trek and advanced by thinkers like Buckminster Fuller and Jacque Fresco, imagines radically optimistic post-scarcity futures where technology, social innovation, and human collaboration solve existential challenges and enable human flourishing. Rather than extrapolating current trends or managing risks, this approach asks \"What is the most inspiring future we can imagine?\" and uses that vision to pull present action toward transformative goals. Star Trek exemplifies this: a future where humanity has transcended war, poverty, and nationalism, united in exploration and self-betterment. Aspirational futures challenge default pessimism in foresight, providing positive visions that motivate action, attract resources, and shift cultural narratives from scarcity to abundance. The method is particularly relevant for addressing civilizational challenges (climate, AI, inequality) where incremental change is insufficient and bold reimagining is needed to inspire transformative action.',|g" "$FILE"

echo "Overview fixes complete. Now fixing descriptions..."

# Fix all 11 short descriptions
sed -i '' "s|description: 'Three forces shaping possible future trajectories',|description: 'Three competing forces - push of the present, pull of envisioned futures, weight of historical inertia - shaping plausible future trajectories',|g" "$FILE"

sed -i '' "s|description: 'Monitor external trends and signals',|description: 'Systematic environmental monitoring across STEEP domains (Social, Technological, Economic, Environmental, Political) to detect trends, signals, and emerging changes',|g" "$FILE"

sed -i '' "s|description: 'Early indicators of potential future change',|description: 'Faint early indicators of potential disruption detected at the periphery before they amplify into mainstream trends or crises',|g" "$FILE"

sed -i '' "s|description: 'Recurring patterns in history and society',|description: 'Identification and analysis of recurring temporal patterns, cycles, and rhythms in history, economics, demographics, and social change',|g" "$FILE"

sed -i '' "s|description: 'Four-layer deconstruction from litany to myth',|description: 'Four-layer depth analysis examining litany (events), systems (structures), worldviews (discourses), and myths (metaphors) underlying current and alternative futures',|g" "$FILE"

sed -i '' "s|description: 'Examining language, power structures, and narrative frames',|description: 'Critical examination of language, narratives, and communication patterns that shape how futures are imagined and whose visions are privileged',|g" "$FILE"

sed -i '' "s|description: 'Developing multiple plausible futures across key uncertainties',|description: 'Development of multiple plausible divergent future narratives to explore uncertainties, test strategies, and challenge assumptions in complex environments',|g" "$FILE"

sed -i '' "s|description: 'Low-probability high-impact events',|description: 'Low-probability high-impact events (Black Swans) that could radically disrupt current trajectories and fundamentally reshape the future if they occurred',|g" "$FILE"

sed -i '' "s|description: 'Systematic exploration of solution space',|description: 'Systematic exploration of all possible combinations of solution parameters to map the complete morphological field of potential futures',|g" "$FILE"

sed -i '' "s|description: 'Structured expert consensus building through iterative rounds',|description: 'Structured expert consensus forecasting process using iterative anonymous surveys with controlled feedback to converge on probabilistic predictions',|g" "$FILE"

sed-i '' "s|description: 'Creating shared images of futures',|description: 'Participatory co-creation of shared aspirational images of desired futures to guide strategic action and motivate transformative change',|g" "$FILE"

echo "All content fixes applied!"
echo "Building to verify..."
npm run build
