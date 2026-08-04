const HERO_SVG_MARKUP = `
<svg id="hero-svg" viewBox="0 0 640 760" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet" style="width:118%;height:100%;max-height:92vh;margin-left:-6%;">
  <defs>
    <radialGradient id="bg-warm" cx="50%" cy="54%" r="52%">
      <stop offset="0%" stop-color="#E7ECFC" stop-opacity="0.55"/>
      <stop offset="100%" stop-color="#E7ECFC" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="ng-sm" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#5B6EF0" stop-opacity="0.38"/>
      <stop offset="55%" stop-color="#5B6EF0" stop-opacity="0.08"/>
      <stop offset="100%" stop-color="#5B6EF0" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="ng-lg" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#5B6EF0" stop-opacity="0.50"/>
      <stop offset="50%" stop-color="#5B6EF0" stop-opacity="0.12"/>
      <stop offset="100%" stop-color="#5B6EF0" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <ellipse cx="340" cy="400" rx="310" ry="290" fill="url(#bg-warm)"/>
  <g stroke="rgba(124,130,153,0.22)" stroke-width="0.75" fill="none">
    <line x1="280" y1="62" x2="420" y2="95"/>
    <line x1="280" y1="62" x2="350" y2="172"/>
    <line x1="280" y1="62" x2="175" y2="122"/>
    <line x1="280" y1="62" x2="522" y2="52"/>
    <line x1="522" y1="52" x2="420" y2="95"/>
    <line x1="522" y1="52" x2="490" y2="192"/>
    <line x1="175" y1="122" x2="90" y2="300"/>
    <line x1="175" y1="122" x2="350" y2="172"/>
    <line x1="175" y1="122" x2="232" y2="352"/>
    <line x1="350" y1="172" x2="420" y2="95"/>
    <line x1="350" y1="172" x2="490" y2="192"/>
    <line x1="350" y1="172" x2="310" y2="415"/>
    <line x1="350" y1="172" x2="442" y2="312"/>
    <line x1="490" y1="192" x2="555" y2="295"/>
    <line x1="490" y1="192" x2="442" y2="312"/>
    <line x1="172" y1="252" x2="90" y2="300"/>
    <line x1="172" y1="252" x2="232" y2="352"/>
    <line x1="172" y1="252" x2="175" y2="122"/>
    <line x1="442" y1="312" x2="555" y2="295"/>
    <line x1="442" y1="312" x2="310" y2="415"/>
    <line x1="442" y1="312" x2="482" y2="422"/>
    <line x1="232" y1="352" x2="90" y2="300"/>
    <line x1="232" y1="352" x2="310" y2="415"/>
    <line x1="232" y1="352" x2="152" y2="442"/>
    <line x1="482" y1="422" x2="555" y2="295"/>
    <line x1="482" y1="422" x2="490" y2="585"/>
    <line x1="482" y1="422" x2="392" y2="492"/>
    <line x1="482" y1="422" x2="582" y2="492"/>
    <line x1="152" y1="442" x2="90" y2="300"/>
    <line x1="152" y1="442" x2="155" y2="595"/>
    <line x1="152" y1="442" x2="252" y2="532"/>
    <line x1="392" y1="492" x2="310" y2="415"/>
    <line x1="392" y1="492" x2="490" y2="585"/>
    <line x1="392" y1="492" x2="442" y2="542"/>
    <line x1="582" y1="492" x2="555" y2="295"/>
    <line x1="582" y1="492" x2="490" y2="585"/>
    <line x1="252" y1="532" x2="155" y2="595"/>
    <line x1="252" y1="532" x2="310" y2="415"/>
    <line x1="252" y1="532" x2="332" y2="642"/>
    <line x1="442" y1="542" x2="490" y2="585"/>
    <line x1="442" y1="542" x2="332" y2="642"/>
    <line x1="82" y1="552" x2="155" y2="595"/>
    <line x1="82" y1="552" x2="90" y2="300"/>
    <line x1="82" y1="552" x2="102" y2="682"/>
    <line x1="332" y1="642" x2="490" y2="585"/>
    <line x1="332" y1="642" x2="155" y2="595"/>
    <line x1="332" y1="642" x2="572" y2="642"/>
    <line x1="572" y1="642" x2="490" y2="585"/>
    <line x1="572" y1="642" x2="582" y2="492"/>
    <line x1="102" y1="682" x2="155" y2="595"/>
    <line x1="280" y1="62" x2="175" y2="122"/>
    <line x1="172" y1="252" x2="232" y2="352"/>
  </g>
  <path id="p13" d="M 420,95 C 400,222 368,328 310,415" stroke="rgba(91,110,240,0.60)" stroke-width="1.8" fill="none" stroke-linecap="round"/>
  <path id="p23" d="M 555,295 C 488,342 418,382 310,415" stroke="rgba(91,110,240,0.54)" stroke-width="1.6" fill="none" stroke-linecap="round"/>
  <path id="p34" d="M 310,415 C 238,388 168,352 90,300" stroke="rgba(91,110,240,0.57)" stroke-width="1.8" fill="none" stroke-linecap="round"/>
  <path id="p35" d="M 310,415 C 258,482 208,538 155,595" stroke="rgba(91,110,240,0.52)" stroke-width="1.6" fill="none" stroke-linecap="round"/>
  <path id="p36" d="M 310,415 C 382,472 432,528 490,585" stroke="rgba(91,110,240,0.55)" stroke-width="1.6" fill="none" stroke-linecap="round"/>
  <path id="p12" d="M 420,95 C 502,152 548,212 555,295" stroke="rgba(91,110,240,0.36)" stroke-width="1.1" fill="none" stroke-linecap="round"/>
  <path id="p14" d="M 420,95 C 298,132 178,202 90,300" stroke="rgba(91,110,240,0.30)" stroke-width="1.1" fill="none" stroke-linecap="round"/>
  <path id="p26" d="M 555,295 C 562,422 532,512 490,585" stroke="rgba(91,110,240,0.32)" stroke-width="0.9" fill="none" stroke-linecap="round"/>
  <path id="p45" d="M 90,300 C 78,422 108,512 155,595" stroke="rgba(91,110,240,0.28)" stroke-width="0.9" fill="none" stroke-linecap="round"/>
  <path id="p56" d="M 155,595 C 272,642 382,642 490,585" stroke="rgba(91,110,240,0.26)" stroke-width="0.9" fill="none" stroke-linecap="round"/>
  <g opacity="0"><circle r="3.2" fill="#5B6EF0"/>
    <animateMotion dur="4.0s" repeatCount="indefinite" begin="0s" calcMode="easeInOut"><mpath href="#p13"/></animateMotion>
    <animate attributeName="opacity" values="0;0.88;0.80;0" keyTimes="0;0.08;0.86;1" dur="4.0s" repeatCount="indefinite" begin="0s"/>
  </g>
  <g opacity="0"><circle r="2.8" fill="#5B6EF0"/>
    <animateMotion dur="3.8s" repeatCount="indefinite" begin="0.9s" calcMode="easeInOut"><mpath href="#p34"/></animateMotion>
    <animate attributeName="opacity" values="0;0.80;0.72;0" keyTimes="0;0.09;0.86;1" dur="3.8s" repeatCount="indefinite" begin="0.9s"/>
  </g>
  <g opacity="0"><circle r="2.6" fill="#5B6EF0"/>
    <animateMotion dur="4.4s" repeatCount="indefinite" begin="1.8s" calcMode="easeInOut"><mpath href="#p36"/></animateMotion>
    <animate attributeName="opacity" values="0;0.76;0.68;0" keyTimes="0;0.08;0.86;1" dur="4.4s" repeatCount="indefinite" begin="1.8s"/>
  </g>
  <g opacity="0"><circle r="2.3" fill="#5B6EF0"/>
    <animateMotion dur="3.9s" repeatCount="indefinite" begin="2.7s" calcMode="easeInOut"><mpath href="#p23"/></animateMotion>
    <animate attributeName="opacity" values="0;0.70;0.62;0" keyTimes="0;0.09;0.86;1" dur="3.9s" repeatCount="indefinite" begin="2.7s"/>
  </g>
  <g opacity="0"><circle r="2.4" fill="#5B6EF0"/>
    <animateMotion dur="4.6s" repeatCount="indefinite" begin="3.5s" calcMode="easeInOut"><mpath href="#p35"/></animateMotion>
    <animate attributeName="opacity" values="0;0.72;0.64;0" keyTimes="0;0.09;0.86;1" dur="4.6s" repeatCount="indefinite" begin="3.5s"/>
  </g>
  <g opacity="0"><circle r="2.0" fill="#5B6EF0"/>
    <animateMotion dur="4.8s" repeatCount="indefinite" begin="4.3s" calcMode="easeInOut"><mpath href="#p56"/></animateMotion>
    <animate attributeName="opacity" values="0;0.60;0.52;0" keyTimes="0;0.10;0.86;1" dur="4.8s" repeatCount="indefinite" begin="4.3s"/>
  </g>
  <g fill="rgba(107,113,133,0.52)">
    <circle cx="280" cy="62" r="2.2"/><circle cx="522" cy="52" r="1.8"/>
    <circle cx="175" cy="122" r="2.0"/><circle cx="350" cy="172" r="2.4"/>
    <circle cx="490" cy="192" r="2.0"/><circle cx="172" cy="252" r="1.8"/>
    <circle cx="442" cy="312" r="2.2"/><circle cx="232" cy="352" r="2.0"/>
    <circle cx="482" cy="422" r="2.2"/><circle cx="152" cy="442" r="1.8"/>
    <circle cx="392" cy="492" r="2.0"/><circle cx="582" cy="492" r="1.8"/>
    <circle cx="252" cy="532" r="2.0"/><circle cx="442" cy="542" r="2.0"/>
    <circle cx="82" cy="552" r="1.8"/><circle cx="332" cy="642" r="2.2"/>
    <circle cx="572" cy="642" r="1.8"/><circle cx="102" cy="682" r="1.8"/>
  </g>
  <ellipse cx="420" cy="95" rx="46" ry="46" fill="url(#ng-sm)" style="animation:heroGlowBreath 4s ease-in-out infinite;"/>
  <ellipse cx="555" cy="295" rx="38" ry="38" fill="url(#ng-sm)" style="animation:heroGlowBreath 5s .5s ease-in-out infinite;"/>
  <ellipse cx="310" cy="415" rx="64" ry="64" fill="url(#ng-lg)" style="animation:heroGlowBreath 4.5s 1s ease-in-out infinite;"/>
  <ellipse cx="90" cy="300" rx="38" ry="38" fill="url(#ng-sm)" style="animation:heroGlowBreath 5.5s 1.5s ease-in-out infinite;"/>
  <ellipse cx="155" cy="595" rx="34" ry="34" fill="url(#ng-sm)" style="animation:heroGlowBreath 4.8s 2s ease-in-out infinite;"/>
  <ellipse cx="490" cy="585" rx="34" ry="34" fill="url(#ng-sm)" style="animation:heroGlowBreath 5.2s 2.5s ease-in-out infinite;"/>
  <circle cx="310" cy="415" r="32" fill="rgba(91,110,240,0.06)" style="animation:heroNodeRing 3.0s ease-out infinite;transform-origin:310px 415px;"/>
  <circle cx="310" cy="415" r="19" fill="none" stroke="rgba(91,110,240,0.34)" stroke-width="1.5"/>
  <circle cx="310" cy="415" r="8" fill="rgba(91,110,240,0.92)" style="animation:heroNodeCore 3s ease-in-out infinite;"/>
  <circle cx="420" cy="95" r="17" fill="rgba(91,110,240,0.05)" style="animation:heroNodeRing 3.5s .4s ease-out infinite;transform-origin:420px 95px;"/>
  <circle cx="420" cy="95" r="11" fill="none" stroke="rgba(91,110,240,0.32)" stroke-width="1.2"/>
  <circle cx="420" cy="95" r="5.5" fill="rgba(91,110,240,0.86)" style="animation:heroNodeCore 3.5s .4s ease-in-out infinite;"/>
  <circle cx="555" cy="295" r="16" fill="rgba(91,110,240,0.05)" style="animation:heroNodeRing 3.8s .8s ease-out infinite;transform-origin:555px 295px;"/>
  <circle cx="555" cy="295" r="10" fill="none" stroke="rgba(91,110,240,0.30)" stroke-width="1.2"/>
  <circle cx="555" cy="295" r="5" fill="rgba(91,110,240,0.83)" style="animation:heroNodeCore 3.8s .8s ease-in-out infinite;"/>
  <circle cx="90" cy="300" r="16" fill="rgba(91,110,240,0.05)" style="animation:heroNodeRing 4.0s 1.2s ease-out infinite;transform-origin:90px 300px;"/>
  <circle cx="90" cy="300" r="10" fill="none" stroke="rgba(91,110,240,0.30)" stroke-width="1.2"/>
  <circle cx="90" cy="300" r="5" fill="rgba(91,110,240,0.80)" style="animation:heroNodeCore 4.0s 1.2s ease-in-out infinite;"/>
  <circle cx="155" cy="595" r="15" fill="rgba(91,110,240,0.05)" style="animation:heroNodeRing 4.2s 1.8s ease-out infinite;transform-origin:155px 595px;"/>
  <circle cx="155" cy="595" r="9" fill="none" stroke="rgba(91,110,240,0.28)" stroke-width="1.2"/>
  <circle cx="155" cy="595" r="4.5" fill="rgba(91,110,240,0.78)" style="animation:heroNodeCore 4.2s 1.8s ease-in-out infinite;"/>
  <circle cx="490" cy="585" r="15" fill="rgba(91,110,240,0.05)" style="animation:heroNodeRing 3.9s 2.2s ease-out infinite;transform-origin:490px 585px;"/>
  <circle cx="490" cy="585" r="9" fill="none" stroke="rgba(91,110,240,0.28)" stroke-width="1.2"/>
  <circle cx="490" cy="585" r="4.5" fill="rgba(91,110,240,0.78)" style="animation:heroNodeCore 3.9s 2.2s ease-in-out infinite;"/>
  <g style="animation:heroLabelFloat 6.5s 0s ease-in-out infinite;">
    <rect x="150" y="40" width="270" height="40" rx="9" fill="white" stroke="rgba(91,110,240,0.22)" stroke-width="1"/>
    <rect x="150" y="40" width="3" height="40" rx="1.5" fill="#5B6EF0"/>
    <text x="165" y="59" font-family="Inter,system-ui,sans-serif" font-size="10.5" font-weight="600" fill="#14161F">Sistema CFA/CRAs</text>
    <text x="165" y="73" font-family="Inter,system-ui,sans-serif" font-size="10" font-weight="400" fill="#7C8299">27 Conselhos Regionais integrados</text>
  </g>
  <g style="animation:heroLabelFloat 6.5s 1.2s ease-in-out infinite;">
    <rect x="392" y="272" width="174" height="33" rx="8" fill="white" stroke="rgba(91,110,240,0.20)" stroke-width="1"/>
    <circle cx="406" cy="288.5" r="3.5" fill="#5B6EF0"/>
    <text x="416" y="293" font-family="Inter,system-ui,sans-serif" font-size="10.5" font-weight="600" fill="#14161F">Processos Padronizados</text>
  </g>
  <g style="animation:heroLabelFloat 6.5s 2.4s ease-in-out infinite;">
    <rect x="150" y="432" width="240" height="33" rx="8" fill="white" stroke="rgba(91,110,240,0.20)" stroke-width="1"/>
    <circle cx="164" cy="448.5" r="3.5" fill="#5B6EF0"/>
    <text x="174" y="453" font-family="Inter,system-ui,sans-serif" font-size="10.5" font-weight="600" fill="#14161F">GRI · Gestão de Relacionamento</text>
  </g>
  <g style="animation:heroLabelFloat 6.5s 0.7s ease-in-out infinite;">
    <rect x="20" y="272" width="200" height="33" rx="8" fill="white" stroke="rgba(91,110,240,0.20)" stroke-width="1"/>
    <circle cx="34" cy="288.5" r="3.5" fill="#5B6EF0"/>
    <text x="44" y="293" font-family="Inter,system-ui,sans-serif" font-size="10.5" font-weight="600" fill="#14161F">Canais de Atendimento</text>
  </g>
  <g style="animation:heroLabelFloat 6.5s 1.9s ease-in-out infinite;">
    <rect x="24" y="610" width="180" height="33" rx="8" fill="white" stroke="rgba(91,110,240,0.20)" stroke-width="1"/>
    <circle cx="38" cy="626.5" r="3.5" fill="#5B6EF0"/>
    <text x="48" y="631" font-family="Inter,system-ui,sans-serif" font-size="10.5" font-weight="600" fill="#14161F">Indicadores Nacionais</text>
  </g>
  <g style="animation:heroLabelFloat 6.5s 3.1s ease-in-out infinite;">
    <rect x="376" y="610" width="190" height="33" rx="8" fill="white" stroke="rgba(91,110,240,0.20)" stroke-width="1"/>
    <circle cx="390" cy="626.5" r="3.5" fill="#5B6EF0"/>
    <text x="400" y="631" font-family="Inter,system-ui,sans-serif" font-size="10.5" font-weight="600" fill="#14161F">Governança do Programa</text>
  </g>
</svg>
`;

/** Diagrama decorativo do hero: rede de nós animada via SMIL, injetada como markup estático. */
export function HeroNetworkSvg() {
  return (
    <div
      className="flex h-full w-full items-center justify-center overflow-hidden"
      dangerouslySetInnerHTML={{ __html: HERO_SVG_MARKUP }}
    />
  );
}
