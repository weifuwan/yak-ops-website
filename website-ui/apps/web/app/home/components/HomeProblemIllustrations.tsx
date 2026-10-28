/**
 * Yak Ops-specific product illustrations for the three data engineering pain points.
 * SVG is kept local so the website does not depend on Collate's external assets.
 */

export function FragmentationIllustration() {
  return (
    <svg aria-hidden="true" className="h-full w-full" viewBox="0 0 416 258" fill="none">
      <defs>
        <linearGradient id="fragmentation-surface" x1="208" y1="0" x2="208" y2="258" gradientUnits="userSpaceOnUse">
          <stop stopColor="#E7F3FF" />
          <stop offset="1" stopColor="#F5FAFF" />
        </linearGradient>
        <filter id="fragmentation-shadow" x="0" y="0" width="416" height="258" filterUnits="userSpaceOnUse">
          <feDropShadow dx="0" dy="8" stdDeviation="10" floodColor="#4777B5" floodOpacity=".12" />
        </filter>
      </defs>
      <rect width="416" height="258" fill="url(#fragmentation-surface)" />
      <circle cx="208" cy="109" r="89" stroke="#C7DFF7" strokeDasharray="4 8" />
      <path d="M93 126V165H208M208 126V165M323 126V165H208" stroke="#9FBBDE" strokeWidth="2" strokeDasharray="5 6" />
      <circle cx="208" cy="165" r="7" fill="#F2F8FF" stroke="#E48991" strokeWidth="2" />
      <path d="M205 162L211 168M211 162L205 168" stroke="#D44B5F" strokeWidth="1.6" strokeLinecap="round" />

      <g filter="url(#fragmentation-shadow)">
        <rect x="22" y="54" width="118" height="83" rx="12" fill="white" stroke="#D8E7F8" />
        <rect x="39" y="69" width="24" height="24" rx="7" fill="#E8F2FF" />
        <path d="M46 76H56M46 81H56M46 86H53" stroke="#2781E7" strokeWidth="1.8" strokeLinecap="round" />
        <text x="70" y="85" fontFamily="Arial, sans-serif" fontSize="12" fontWeight="600" fill="#263A58">Integration</text>
        <rect x="39" y="105" width="83" height="5" rx="2.5" fill="#DCE7F6" />
        <rect x="39" y="117" width="56" height="5" rx="2.5" fill="#E9F0FA" />

        <rect x="149" y="32" width="118" height="93" rx="12" fill="white" stroke="#D8E7F8" />
        <rect x="165" y="48" width="24" height="24" rx="7" fill="#E4F3FA" />
        <path d="M174 54L170 60L174 66M180 54L184 60L180 66" stroke="#178BA5" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        <text x="195" y="63" fontFamily="Arial, sans-serif" fontSize="11.5" fontWeight="600" fill="#263A58">Development</text>
        <rect x="166" y="84" width="81" height="5" rx="2.5" fill="#DCE7F6" />
        <rect x="166" y="96" width="62" height="5" rx="2.5" fill="#E9F0FA" />

        <rect x="276" y="54" width="118" height="83" rx="12" fill="white" stroke="#D8E7F8" />
        <rect x="293" y="69" width="24" height="24" rx="7" fill="#F0EDFF" />
        <circle cx="305" cy="81" r="7" stroke="#8873D6" strokeWidth="1.6" />
        <path d="M305 77V81L308 83" stroke="#8873D6" strokeWidth="1.6" strokeLinecap="round" />
        <text x="323" y="85" fontFamily="Arial, sans-serif" fontSize="11.5" fontWeight="600" fill="#263A58">Scheduling</text>
        <rect x="293" y="105" width="83" height="5" rx="2.5" fill="#DCE7F6" />
        <rect x="293" y="117" width="56" height="5" rx="2.5" fill="#E9F0FA" />
      </g>

      <rect x="120" y="188" width="176" height="34" rx="17" fill="#FFFFFF" stroke="#D6E5F8" />
      <circle cx="140" cy="205" r="6" fill="#E5A6AB" />
      <text x="153" y="209" fontFamily="Arial, sans-serif" fontSize="12" fontWeight="600" fill="#526887">
        Disconnected workflow
      </text>
    </svg>
  );
}

export function ManualWorkIllustration() {
  return (
    <svg aria-hidden="true" className="h-full w-full" viewBox="0 0 416 258" fill="none">
      <defs>
        <linearGradient id="manual-surface" x1="208" y1="0" x2="208" y2="258" gradientUnits="userSpaceOnUse">
          <stop stopColor="#E7F3FF" />
          <stop offset="1" stopColor="#F5FAFF" />
        </linearGradient>
        <filter id="manual-shadow" x="50" y="5" width="320" height="235" filterUnits="userSpaceOnUse">
          <feDropShadow dx="0" dy="9" stdDeviation="12" floodColor="#4777B5" floodOpacity=".13" />
        </filter>
      </defs>
      <rect width="416" height="258" fill="url(#manual-surface)" />
      <circle cx="326" cy="70" r="46" fill="#D5EAFE" opacity=".75" />
      <circle cx="84" cy="196" r="58" fill="#DFEEFF" opacity=".65" />

      <g filter="url(#manual-shadow)">
        <rect x="76" y="31" width="265" height="191" rx="14" fill="white" stroke="#CFE1F7" />
        <path d="M76 45C76 37.268 82.268 31 90 31H327C334.732 31 341 37.268 341 45V65H76V45Z" fill="#F7FAFF" />
        <circle cx="94" cy="48" r="4" fill="#FFB7A6" />
        <circle cx="107" cy="48" r="4" fill="#F9D680" />
        <circle cx="120" cy="48" r="4" fill="#9DDECE" />
        <text x="208" y="52" fontFamily="Arial, sans-serif" fontSize="12" fontWeight="600" textAnchor="middle" fill="#365170">
          Pipeline setup
        </text>

        <rect x="94" y="80" width="229" height="35" rx="8" fill="#F4F8FF" />
        <rect x="107" y="90" width="14" height="14" rx="4" fill="#D9E9FB" stroke="#A2C4E9" />
        <path d="M111 97L114 100L119 94" stroke="#2B87EB" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        <text x="132" y="102" fontFamily="Arial, sans-serif" fontSize="12" fill="#3C587A">Configure sources</text>
        <path d="M283 97H307" stroke="#B7CBE5" strokeWidth="2" strokeLinecap="round" />

        <rect x="94" y="123" width="229" height="35" rx="8" fill="#F4F8FF" />
        <rect x="107" y="133" width="14" height="14" rx="4" fill="#D9E9FB" stroke="#A2C4E9" />
        <path d="M111 140L114 143L119 137" stroke="#2B87EB" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        <text x="132" y="145" fontFamily="Arial, sans-serif" fontSize="12" fill="#3C587A">Set up schedules</text>
        <path d="M283 140H307" stroke="#B7CBE5" strokeWidth="2" strokeLinecap="round" />

        <rect x="94" y="166" width="229" height="35" rx="8" fill="#F4F8FF" />
        <rect x="107" y="176" width="14" height="14" rx="4" fill="#D9E9FB" stroke="#A2C4E9" />
        <path d="M111 183L114 186L119 180" stroke="#2B87EB" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        <text x="132" y="188" fontFamily="Arial, sans-serif" fontSize="12" fill="#3C587A">Verify and deploy</text>
        <path d="M283 183H307" stroke="#B7CBE5" strokeWidth="2" strokeLinecap="round" />
      </g>

      <rect x="144" y="211" width="128" height="33" rx="16.5" fill="#E9F3FF" stroke="#B8D6F6" />
      <path d="M159 228C159 222.5 166 220.5 170 224M170 224V220M170 224H166M171 228C171 233.5 164 235.5 160 232M160 232V236M160 232H164" stroke="#3189E8" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
      <text x="181" y="232" fontFamily="Arial, sans-serif" fontSize="12" fontWeight="600" fill="#2E6FB9">
        Repeat setup
      </text>
    </svg>
  );
}

export function BlindSpotsIllustration() {
  return (
    <svg aria-hidden="true" className="h-full w-full" viewBox="0 0 416 258" fill="none">
      <defs>
        <linearGradient id="blind-surface" x1="208" y1="0" x2="208" y2="258" gradientUnits="userSpaceOnUse">
          <stop stopColor="#E7F3FF" />
          <stop offset="1" stopColor="#F5FAFF" />
        </linearGradient>
        <filter id="blind-shadow" x="10" y="0" width="395" height="248" filterUnits="userSpaceOnUse">
          <feDropShadow dx="0" dy="9" stdDeviation="11" floodColor="#4777B5" floodOpacity=".12" />
        </filter>
      </defs>
      <rect width="416" height="258" fill="url(#blind-surface)" />
      <path d="M104 67H179M237 67H312" stroke="#84AED9" strokeWidth="3" strokeDasharray="6 6" strokeLinecap="round" />
      <path d="M253 58L264 76M264 58L253 76" stroke="#D6455E" strokeWidth="2.5" strokeLinecap="round" />
      <g filter="url(#blind-shadow)">
        <rect x="30" y="40" width="88" height="54" rx="10" fill="white" stroke="#D6E4F7" />
        <rect x="45" y="54" width="17" height="17" rx="4" fill="#DCEFFF" />
        <path d="M49 60H58M49 65H58" stroke="#2288E5" strokeWidth="1.6" strokeLinecap="round" />
        <text x="69" y="64" fontSize="11" fontFamily="Arial, sans-serif" fontWeight="600" fill="#365170">Source</text>
        <rect x="46" y="80" width="52" height="4" rx="2" fill="#DBE7F6" />

        <rect x="166" y="37" width="84" height="60" rx="10" fill="white" stroke="#D6E4F7" />
        <rect x="179" y="51" width="17" height="17" rx="4" fill="#DFEAFE" />
        <path d="M183 59H192M187.5 54V64" stroke="#5484DA" strokeWidth="1.5" strokeLinecap="round" />
        <text x="202" y="62" fontSize="11" fontFamily="Arial, sans-serif" fontWeight="600" fill="#365170">Task</text>
        <rect x="180" y="79" width="52" height="4" rx="2" fill="#DBE7F6" />

        <rect x="303" y="40" width="84" height="54" rx="10" fill="white" stroke="#D6E4F7" />
        <rect x="316" y="54" width="17" height="17" rx="4" fill="#E8F7F1" />
        <path d="M320 59H329M320 64H329" stroke="#4DAD94" strokeWidth="1.6" strokeLinecap="round" />
        <text x="339" y="64" fontSize="10.5" fontFamily="Arial, sans-serif" fontWeight="600" fill="#365170">Sink</text>
        <rect x="317" y="80" width="52" height="4" rx="2" fill="#DBE7F6" />

        <rect x="59" y="119" width="298" height="112" rx="13" fill="white" stroke="#D6E4F7" />
        <rect x="59" y="119" width="298" height="33" rx="13" fill="#F9FBFF" />
        <path d="M59 141V152H357V141" fill="#F9FBFF" />
        <circle cx="80" cy="136" r="5.5" fill="#E25569" />
        <text x="94" y="140" fontSize="12" fontFamily="Arial, sans-serif" fontWeight="600" fill="#394F6E">
          Pipeline failed
        </text>
        <rect x="284" y="127" width="57" height="18" rx="9" fill="#FFF0F2" />
        <text x="312" y="140" textAnchor="middle" fontSize="10.5" fontFamily="Arial, sans-serif" fontWeight="600" fill="#D04963">
          Error
        </text>
        <rect x="79" y="165" width="20" height="5" rx="2.5" fill="#9DB5D4" />
        <rect x="109" y="165" width="197" height="5" rx="2.5" fill="#D9E5F4" />
        <rect x="79" y="181" width="20" height="5" rx="2.5" fill="#9DB5D4" />
        <rect x="109" y="181" width="170" height="5" rx="2.5" fill="#D9E5F4" />
        <rect x="79" y="197" width="20" height="5" rx="2.5" fill="#E8A3B0" />
        <rect x="109" y="197" width="208" height="5" rx="2.5" fill="#F1CBD4" />
        <rect x="79" y="213" width="20" height="5" rx="2.5" fill="#9DB5D4" />
        <rect x="109" y="213" width="146" height="5" rx="2.5" fill="#D9E5F4" />
      </g>
    </svg>
  );
}
