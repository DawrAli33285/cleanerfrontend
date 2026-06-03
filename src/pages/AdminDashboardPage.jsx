import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { BASE_URL } from "../baseurl";
import { useToast } from "../components/toast";
import React from "react";
import { useNavigate } from "react-router-dom";

// ─── Shared Design Tokens ────────────────────────────────────────────────────
const primary = "#1669A9";
const primaryHover = "#1E90CF";
const bg = "#F5F7FA";
const surface = "#FFFFFF";
const surfaceMid = "#F0F4F8";
const border = "#E5EAF0";
const borderPrimary = "rgba(22,105,169,0.25)";
const textPrimary = "#1A1A2E";
const textSecondary = "#374151";
const textMuted = "#9CA3AF";

function Logo({ size = 64 }) {
  return (
    <div className="flex items-center gap-3">
    <svg xmlns="http://www.w3.org/2000/svg" width="150" height="150" viewBox="0 0 520 372">
      <path d="M0 0 C0.99 0.99 0.99 0.99 2 2 C1.625 4.125 1.625 4.125 1 6 C-3.20145608 4.25924326 -7.22130026 2.38995147 -11.23779297 0.24658203 C-18.24869382 -3.45568152 -25.35277951 -6.37071794 -32.875 -8.875 C-33.72980957 -9.16084961 -34.58461914 -9.44669922 -35.46533203 -9.74121094 C-62.9343382 -18.58437312 -93.22329581 -17.0555125 -119.125 -4.25 C-121.77633399 -2.87884207 -124.3931546 -1.4537279 -127 0 C-127.90081299 0.4942749 -127.90081299 0.4942749 -128.81982422 0.99853516 C-145.17703328 10.14503523 -157.74108797 24.5065593 -168 40 C-168 40.66 -168 41.32 -168 42 C-167.154375 41.2575 -166.30875 40.515 -165.4375 39.75 C-161.21509814 36.2363228 -156.53736913 32.88597906 -151 32 C-150.47761979 39.95442587 -154.37647695 46.65741206 -159.38037109 52.65429688 C-162.72895899 56.31213866 -166.33148555 59.66675376 -170 63 C-170.81855469 63.76054688 -171.63710937 64.52109375 -172.48046875 65.3046875 C-177.65662651 70 -177.65662651 70 -180 70 C-183.65244415 80.08074584 -185.367759 89.25326466 -185 100 C-184.72027344 98.97261719 -184.44054687 97.94523437 -184.15234375 96.88671875 C-180.4361997 83.81139711 -175.27021688 71.92738231 -162.94921875 64.81640625 C-161 64 -161 64 -158 64 C-158.58606294 69.66952194 -159.61880918 74.91791388 -161.25 80.375 C-161.46744873 81.11161865 -161.68489746 81.8482373 -161.90893555 82.60717773 C-163.681097 88.39767875 -165.96649419 93.7462261 -169 99 C-169.66 99 -170.32 99 -171 99 C-171.22558594 99.56460938 -171.45117188 100.12921875 -171.68359375 100.7109375 C-173.37306432 103.64871125 -175.49826383 105.41865003 -178.0625 107.625 C-181.51651125 110.43092091 -181.51651125 110.43092091 -184 114 C-184.09050382 126.65243434 -181.61548656 141.04831217 -175 152 C-174.34 152.33 -173.68 152.66 -173 153 C-173.02320313 152.10539063 -173.04640625 151.21078125 -173.0703125 150.2890625 C-173.18043474 142.91087242 -172.84659266 136.15554657 -171 129 C-169.68 129 -168.36 129 -167 129 C-166.06953067 130.86093867 -165.14004133 132.72237228 -164.21484375 134.5859375 C-163.39022545 136.22456808 -162.54841674 137.85463817 -161.69140625 139.4765625 C-161.25699219 140.30929688 -160.82257813 141.14203125 -160.375 142 C-159.97023437 142.763125 -159.56546875 143.52625 -159.1484375 144.3125 C-156.16364213 151.29732727 -155.6579668 158.00412893 -155.4375 165.5 C-155.50426366 178.23294731 -155.50426366 178.23294731 -150.4375 189.5 C-149.79683594 190.3559375 -149.15617187 191.211875 -148.49609375 192.09375 C-147.75552734 193.03734375 -147.75552734 193.03734375 -147 194 C-147.3609375 192.79085937 -147.721875 191.58171875 -148.09375 190.3359375 C-150.98188725 180.28357246 -152.77271767 171.52613185 -152 161 C-151.01 160.67 -150.02 160.34 -149 160 C-148.54173828 160.804375 -148.54173828 160.804375 -148.07421875 161.625 C-145.65558403 165.76733778 -143.17179761 169.80934849 -140.36328125 173.69921875 C-131.61212031 185.83894743 -126.28675109 197.31285929 -123.640625 212.171875 C-123.13532642 215.18395084 -123.13532642 215.18395084 -121 218 C-113.575 217.01 -113.575 217.01 -106 216 C-107.7325 215.0409375 -107.7325 215.0409375 -109.5 214.0625 C-118.8799626 208.11301842 -124.43578898 199.42261706 -128 189 C-128.15625 186.109375 -128.15625 186.109375 -128 184 C-121.71356263 184.9768687 -116.52255233 187.96801049 -111 191 C-110.27167969 191.39703125 -109.54335937 191.7940625 -108.79296875 192.203125 C-102.61026131 196.18221981 -99.13615435 202.34267282 -95.296875 208.44140625 C-91.84619452 214.38252773 -91.84619452 214.38252773 -86.265625 217.92578125 C-85.27046875 218.05339844 -84.2753125 218.18101562 -83.25 218.3125 C-81.77273437 218.52326172 -81.77273437 218.52326172 -80.265625 218.73828125 C-72.39327287 219.36919942 -66.63424573 218.6809396 -59.1875 216.125 C-58.27822754 215.81618896 -57.36895508 215.50737793 -56.43212891 215.18920898 C-42.50042861 210.25772976 -29.53716686 203.25167422 -18 194 C-17.11441406 193.32710937 -16.22882813 192.65421875 -15.31640625 191.9609375 C-7.71259319 186.02888476 -1.37185414 179.1947463 5 172 C5.99 172.33 6.98 172.66 8 173 C6.7188338 177.70674428 5.02398675 180.52414178 1.6875 184.0625 C0.87667969 184.92746094 0.06585938 185.79242188 -0.76953125 186.68359375 C-1.50558594 187.44800781 -2.24164063 188.21242187 -3 189 C-3.825 189.86625 -4.65 190.7325 -5.5 191.625 C-20.04544333 205.44317117 -35.59836779 215.63779151 -54.67578125 221.87109375 C-57.80944627 222.6620559 -57.80944627 222.6620559 -59 224 C-58.2265625 224.30292969 -57.453125 224.60585937 -56.65625 224.91796875 C-50.34781483 227.45539626 -44.55152981 230.04987302 -39 234 C-39 234.66 -39 235.32 -39 236 C-46.59963506 236.63715045 -52.50365348 234.32710768 -59.5625 231.6875 C-81.59209539 223.8373135 -107.38568382 218.79791334 -130 228 C-133.8517792 229.91879695 -137.45618269 232.1185945 -141.046875 234.48828125 C-144 236 -144 236 -146.890625 235.73046875 C-147.58671875 235.48941406 -148.2828125 235.24835938 -149 235 C-146.71762284 229.17015664 -141.13108828 226.17157819 -136 223 C-132.99298528 221.69466267 -130.18247582 220.83474776 -127 220 C-130.17056811 216.4182859 -133.68682264 214.36841244 -137.9375 212.3125 C-138.84918945 211.85133789 -138.84918945 211.85133789 -139.77929688 211.38085938 C-144.89251988 208.86010111 -149.41755475 207.94926643 -155.0625 207.640625 C-166.32050529 206.92204911 -175.7590844 205.96399937 -186 201 C-187.5778125 200.34064453 -187.5778125 200.34064453 -189.1875 199.66796875 C-194.81842347 197.29062733 -194.81842347 197.29062733 -197 196 C-197.33 195.01 -197.66 194.02 -198 193 C-188.74259525 187.93046883 -176.75247191 187.40015367 -166.5 189.8125 C-162.88684321 191.03839248 -159.46686778 192.41101893 -156 194 C-156.84643099 192.95203782 -157.70276192 191.91207308 -158.5625 190.875 C-159.03816406 190.29492188 -159.51382813 189.71484375 -160.00390625 189.1171875 C-166.33698197 182.39991344 -171.85649142 179.65635405 -180.75 177.0625 C-190.76244105 173.94420421 -198.42381823 170.57467576 -206.56640625 163.89453125 C-209.01099125 161.85352144 -209.01099125 161.85352144 -212.25 160.4375 C-215 159 -215 159 -216 156 C-213.55959975 153.55959975 -207.24501349 154.45143717 -203.86303711 154.39306641 C-194.5381755 154.56505733 -187.82050592 158.27925825 -180 163 C-178.67482113 163.68273215 -177.345905 164.35909286 -176 165 C-176.38671875 164.38253906 -176.7734375 163.76507813 -177.171875 163.12890625 C-179.73604436 158.95895756 -182.10398945 154.94612182 -183.875 150.375 C-187.07509317 142.84144733 -193.35383594 138.38364012 -200 134 C-208.42211298 126.89384218 -211.97125371 118.65122351 -215.3125 108.375 C-215.5794165 107.56321289 -215.84633301 106.75142578 -216.12133789 105.91503906 C-217.6179062 101.09095774 -218.29099903 97.04849477 -218 92 C-213.71019766 92.52187376 -210.86830829 95.18051174 -207.6875 97.875 C-207.11153076 98.36170166 -206.53556152 98.84840332 -205.94213867 99.34985352 C-199.62459405 104.90120319 -195.67093141 111.50155717 -192 119 C-191.7219095 105.54350971 -192.35957204 95.7309574 -198.43579102 83.48974609 C-201.82833494 76.60978743 -203.34693445 70.33753243 -203.25 62.6875 C-203.24613281 61.94636963 -203.24226562 61.20523926 -203.23828125 60.44165039 C-203.14969374 54.80096401 -202.50084919 49.45397874 -201 44 C-196.07237604 46.14017566 -194.19860502 49.19358588 -192 54 C-190.36705534 58.91707917 -189.17522846 63.957679 -188 69 C-186.64574642 67.87877355 -186.64574642 67.87877355 -186.96582031 64.97167969 C-187.0000934 63.62166082 -187.03779661 62.27172655 -187.078125 60.921875 C-187.10544549 59.43491878 -187.13144069 57.94793774 -187.15625 56.4609375 C-187.19900502 54.1239869 -187.24879402 51.78834705 -187.32226562 49.45214844 C-187.73255169 35.81306751 -185.22411652 25.31177294 -177.6875 13.6875 C-176.99011719 12.59824219 -176.29273438 11.50898437 -175.57421875 10.38671875 C-175.05472656 9.59910156 -174.53523438 8.81148437 -174 8 C-173.01 8.33 -172.02 8.66 -171 9 C-170.505 19.395 -170.505 19.395 -170 30 C-168.205625 27.710625 -168.205625 27.710625 -166.375 25.375 C-145.59370203 0.11273466 -119.21828589 -17.39559974 -86.18359375 -21.3359375 C-56.46238008 -24.203434 -24.28005025 -18.3754678 0 0 Z" fill="#1669A9" transform="translate(219,23)" />
      <path d="M0 0 C11.22 0 22.44 0 34 0 C33.67 1.32 33.34 2.64 33 4 C29.535 5.485 29.535 5.485 26 7 C26 35.05 26 63.1 26 92 C29.96 92.66 33.92 93.32 38 94 C37.88200042 86.63090704 37.75777029 79.26195596 37.62768555 71.89306641 C37.58429097 69.38463216 37.5426193 66.87616751 37.50268555 64.36767578 C37.44509243 60.76846132 37.38136657 57.16940058 37.31640625 53.5703125 C37.29969376 52.44319855 37.28298126 51.31608459 37.26576233 50.15481567 C37.2358445 48.59342361 37.2358445 48.59342361 37.20532227 47.00048828 C37.18977798 46.08115509 37.1742337 45.1618219 37.15821838 44.21463013 C37.1389322 41.95924846 37.1389322 41.95924846 36 40 C34.02111039 39.27306096 32.02045442 38.60183749 30 38 C30 36.68 30 35.36 30 34 C41.55 34 53.1 34 65 34 C65 35.32 65 36.64 65 38 C62.03 38.99 59.06 39.98 56 41 C55.26743059 50.13095449 54.89370394 59.2147466 54.875 68.375 C54.87048828 69.27686035 54.86597656 70.1787207 54.86132812 71.10791016 C54.87455715 77.12601236 55.29384867 83.02425467 56 89 C60.62835605 83.85738217 63.76503079 78.62772205 66 72.0625 C67 70 67 70 69.0625 69.125 C69.701875 69.08375 70.34125 69.0425 71 69 C71.33 69.33 71.66 69.66 72 70 C71.95805864 72.06457311 71.84190958 74.12771106 71.6953125 76.1875 C71.60636719 77.44304687 71.51742187 78.69859375 71.42578125 79.9921875 C71.35157959 80.97783691 71.35157959 80.97783691 71.27587891 81.98339844 C71.12566773 83.99107532 70.98605611 85.99929073 70.84765625 88.0078125 C70.12865102 97.87134898 70.12865102 97.87134898 69 99 C64.33154772 99.14426614 59.67134047 99.04208415 55 99 C55 107.58 55 116.16 55 125 C58.609375 124.9175 62.21875 124.835 65.9375 124.75 C67.05632568 124.73420898 68.17515137 124.71841797 69.32788086 124.70214844 C77.41482419 124.43051063 84.10528899 122.78719508 90.25 117.3125 C93.10206465 114.23195504 94.91985441 110.72030357 96.7265625 106.953125 C98.2156641 104.66922684 99.49807209 103.99232584 102 103 C102.99268642 106.84258704 102.91845185 109.5843351 102.07421875 113.44921875 C101.85443359 114.46177734 101.63464844 115.47433594 101.40820312 116.51757812 C101.17037109 117.56365234 100.93253906 118.60972656 100.6875 119.6875 C100.3481543 121.27401367 100.3481543 121.27401367 100.00195312 122.89257812 C98.26254618 130.73745382 98.26254618 130.73745382 96 133 C93.21591187 133.24050903 93.21591187 133.24050903 89.62255859 133.22705078 C88.96877731 133.22734283 88.31499603 133.22763489 87.6414032 133.22793579 C85.47694704 133.22654065 83.31283364 133.2109712 81.1484375 133.1953125 C79.64914132 133.19158302 78.1498427 133.18873574 76.65054321 133.18673706 C72.70163257 133.17909548 68.75286871 133.1594426 64.80401611 133.1373291 C60.77561428 133.1168819 56.74718876 133.10773776 52.71875 133.09765625 C44.81243259 133.07619711 36.90623455 133.04205495 29 133 C28.505 131.02 28.505 131.02 28 129 C28.56589844 128.73445312 29.13179687 128.46890625 29.71484375 128.1953125 C30.44832031 127.84210938 31.18179688 127.48890625 31.9375 127.125 C32.66839844 126.77695313 33.39929688 126.42890625 34.15234375 126.0703125 C36.16332459 125.1315023 36.16332459 125.1315023 37 123 C37.08449628 121.2595583 37.10723024 119.51590278 37.09765625 117.7734375 C37.09515869 116.84450684 37.09266113 115.91557617 37.09008789 114.95849609 C37.08098389 113.77594238 37.07187988 112.59338867 37.0625 111.375 C37.041875 107.62125 37.02125 103.8675 37 100 C18.685 99.505 18.685 99.505 0 99 C0 97.68 0 96.36 0 95 C1.134375 94.5875 2.26875 94.175 3.4375 93.75 C7.01203704 92.47484999 7.01203704 92.47484999 7.71357727 90.3289032 C8.09831023 87.2006395 8.13573201 84.14028821 8.14526367 80.98754883 C8.14862228 80.28941071 8.1519809 79.59127258 8.15544128 78.87197876 C8.16492864 76.56697806 8.16689361 74.26205025 8.16796875 71.95703125 C8.17118404 70.34763052 8.17454832 68.73823008 8.17805481 67.12882996 C8.18404138 63.75376712 8.18589531 60.37872988 8.18530273 57.00366211 C8.18520141 52.69770235 8.19882509 48.39190858 8.21607494 44.08598804 C8.22724631 40.75979371 8.22922033 37.43363876 8.22869301 34.1074276 C8.22986649 32.52114988 8.23425246 30.93487093 8.24202538 29.34861183 C8.42179271 17.50811957 8.42179271 17.50811957 6 6 C3.66386669 4.33326425 1.81967257 3.78324238 -1 3 C-0.67 2.01 -0.34 1.02 0 0 Z" fill="#1669A9" transform="translate(97,48)" />
    </svg>
  </div>
  );
}
// ─── Status Badge ─────────────────────────────────────────────────────────────
const STATUS_STYLES = {
  pending_approval: { bg: "rgba(234,179,8,0.1)",   color: "#92400E", border: "rgba(234,179,8,0.4)",    label: "Pending Approval" },
  approved:         { bg: "rgba(22,105,169,0.08)",  color: primary,   border: "rgba(22,105,169,0.3)",   label: "Approved" },
  completed:        { bg: "rgba(16,185,129,0.08)",  color: "#065F46", border: "rgba(16,185,129,0.3)",   label: "Completed" },
  denied:           { bg: "rgba(220,38,38,0.08)",   color: "#DC2626", border: "rgba(220,38,38,0.25)",   label: "Denied" },
};

function StatusBadge({ status }) {
  const s = STATUS_STYLES[status] || { bg: "rgba(0,0,0,0.04)", color: textMuted, border: border, label: status };
  return (
    <span style={{
      display: "inline-flex", alignItems: "center", borderRadius: 999,
      border: `1px solid ${s.border}`, backgroundColor: s.bg, color: s.color,
      padding: "3px 10px", fontSize: 11, fontWeight: 600, whiteSpace: "nowrap",
      letterSpacing: "0.04em",
    }}>
      {s.label}
    </span>
  );
}

// ─── Pill Tab ─────────────────────────────────────────────────────────────────
function Tab({ label, active, onClick, count }) {
  return (
    <button onClick={onClick} style={{
      padding: "8px 20px", borderRadius: 8, fontSize: 13, fontWeight: 500, cursor: "pointer",
      border: `1px solid ${active ? borderPrimary : border}`,
      backgroundColor: active ? "rgba(22,105,169,0.08)" : surface,
      color: active ? primary : textMuted, transition: "all .2s",
      boxShadow: active ? "none" : "0 1px 2px rgba(0,0,0,0.04)",
    }}>
      {label}{count !== undefined && <span style={{ marginLeft: 6, opacity: 0.6, fontSize: 11 }}>({count})</span>}
    </button>
  );
}

// ─── Modal Wrapper ────────────────────────────────────────────────────────────
function Modal({ title, subtitle, onClose, children }) {
  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 60, display: "flex",
      alignItems: "center", justifyContent: "center", padding: 16,
      backgroundColor: "rgba(26,26,46,0.5)", backdropFilter: "blur(4px)",
    }} onClick={onClose}>
      <div style={{
        backgroundColor: surface, border: `1px solid ${border}`, borderRadius: 16,
        width: "100%", maxWidth: 540, maxHeight: "90vh", display: "flex", flexDirection: "column",
        boxShadow: "0 20px 60px rgba(22,105,169,0.12), 0 4px 16px rgba(0,0,0,0.08)",
      }} onClick={e => e.stopPropagation()}>
        <div style={{ padding: "24px 28px 16px", borderBottom: `1px solid ${border}`, flexShrink: 0 }}>
          <div style={{ color: textPrimary, fontSize: 18, fontWeight: 700 }}>{title}</div>
          {subtitle && <div style={{ color: textMuted, fontSize: 12.5, marginTop: 3 }}>{subtitle}</div>}
        </div>
        <div style={{ overflowY: "auto", flex: 1, padding: "20px 28px 28px" }}>{children}</div>
      </div>
    </div>
  );
}

// ─── Form Field ───────────────────────────────────────────────────────────────
function Field({ label, children }) {
  return (
    <div style={{ marginBottom: 14 }}>
      <label style={{ display: "block", color: textSecondary, fontSize: 12, fontWeight: 500, marginBottom: 6 }}>{label}</label>
      {children}
    </div>
  );
}

const inputStyle = {
  width: "100%", height: 42, padding: "0 12px", borderRadius: 8,
  backgroundColor: "#F9FAFB", border: `1px solid #D1D5DB`, color: textPrimary,
  fontSize: 13.5, outline: "none", boxSizing: "border-box",
};

const selectStyle = { ...inputStyle, appearance: "none" };

// ─── Action Button ────────────────────────────────────────────────────────────
function ActionBtn({ onClick, color = primary, hoverColor = primaryHover, textColor = "#fff", children, disabled, style = {} }) {
  const [hov, setHov] = useState(false);
  return (
    <button onClick={onClick} disabled={disabled}
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{
        backgroundColor: hov ? hoverColor : color, color: textColor,
        border: "none", borderRadius: 8, padding: "8px 16px",
        fontSize: 12.5, fontWeight: 600, cursor: disabled ? "not-allowed" : "pointer",
        opacity: disabled ? 0.6 : 1, transition: "all .2s", ...style,
      }}>{children}</button>
  );
}

function GhostBtn({ onClick, children, danger, style = {} }) {
  const [hov, setHov] = useState(false);
  const c = danger ? (hov ? "#b91c1c" : "#DC2626") : (hov ? primary : textMuted);
  return (
    <button onClick={onClick}
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{
        backgroundColor: "transparent", color: c,
        border: `1px solid ${hov ? (danger ? "#DC2626" : borderPrimary) : border}`,
        borderRadius: 8, padding: "8px 16px", fontSize: 12.5, fontWeight: 500,
        cursor: "pointer", transition: "all .2s", ...style,
      }}>{children}</button>
  );
}

// ─── Upload Documents Modal ───────────────────────────────────────────────────
function UploadDocumentsModal({ request, token, onClose }) {
  const { success: ok, error: err } = useToast();
  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [uploaded, setUploaded] = useState([]);
  const fileInputRef = React.useRef(null);

  const handleFileChange = (e) => {
    const selected = Array.from(e.target.files);
    setFiles(prev => [...prev, ...selected]);
    e.target.value = "";
  };

  const removeFile = (index) => setFiles(prev => prev.filter((_, i) => i !== index));

  const handleUpload = async () => {
    if (!files.length) return;
    const formData = new FormData();
    files.forEach(f => formData.append("documents", f));
    try {
      setUploading(true);
      const { data } = await axios.post(
        `${BASE_URL}/admin/requests/${request.id}/documents`,
        formData,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      ok("Uploaded", `${files.length} document${files.length !== 1 ? "s" : ""} uploaded successfully.`);
      setUploaded(prev => [...prev, ...(data.files || [])]);
      setFiles([]);
    } catch (e) {
      err("Upload failed", e?.response?.data?.message || "Could not upload documents.");
    } finally {
      setUploading(false);
    }
  };

  const formatSize = (bytes) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  return (
    <Modal title="Upload Documents" subtitle={`Request #${request.id} — ${request.customerName}`} onClose={onClose}>
      <div
        onClick={() => fileInputRef.current?.click()}
        style={{
          border: `2px dashed ${borderPrimary}`, borderRadius: 10, padding: "32px 20px",
          textAlign: "center", cursor: "pointer", backgroundColor: "rgba(22,105,169,0.03)",
          transition: "background .2s", marginBottom: 16,
        }}
        onMouseEnter={e => e.currentTarget.style.backgroundColor = "rgba(22,105,169,0.07)"}
        onMouseLeave={e => e.currentTarget.style.backgroundColor = "rgba(22,105,169,0.03)"}
        onDragOver={e => { e.preventDefault(); e.currentTarget.style.backgroundColor = "rgba(22,105,169,0.1)"; }}
        onDragLeave={e => e.currentTarget.style.backgroundColor = "rgba(22,105,169,0.03)"}
        onDrop={e => {
          e.preventDefault();
          e.currentTarget.style.backgroundColor = "rgba(22,105,169,0.03)";
          setFiles(prev => [...prev, ...Array.from(e.dataTransfer.files)]);
        }}
      >
        <div style={{ fontSize: 28, marginBottom: 8 }}>📄</div>
        <div style={{ color: primary, fontSize: 13.5, fontWeight: 500, marginBottom: 4 }}>Click to browse or drag & drop</div>
        <div style={{ color: textMuted, fontSize: 12 }}>PDF, images, Word documents, etc.</div>
        <input ref={fileInputRef} type="file" multiple style={{ display: "none" }} onChange={handleFileChange} />
      </div>

      {files.length > 0 && (
        <div style={{ marginBottom: 16 }}>
          <div style={{ color: textMuted, fontSize: 11.5, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 8 }}>Queued ({files.length})</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            {files.map((f, i) => (
              <div key={i} style={{
                display: "flex", alignItems: "center", justifyContent: "space-between",
                backgroundColor: "#F9FAFB", border: `1px solid ${border}`, borderRadius: 8, padding: "8px 12px",
              }}>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ color: textPrimary, fontSize: 12.5, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{f.name}</div>
                  <div style={{ color: textMuted, fontSize: 11 }}>{formatSize(f.size)}</div>
                </div>
                <button onClick={() => removeFile(i)} style={{ background: "none", border: "none", color: "#DC2626", cursor: "pointer", fontSize: 15, padding: "0 4px" }}>×</button>
              </div>
            ))}
          </div>
        </div>
      )}

      {uploaded.length > 0 && (
        <div style={{ marginBottom: 16 }}>
          <div style={{ color: "#065F46", fontSize: 11.5, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 8 }}>✓ Uploaded this session ({uploaded.length})</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
            {uploaded.map((u, i) => (
              <div key={i} style={{
                display: "flex", alignItems: "center", gap: 8,
                backgroundColor: "rgba(16,185,129,0.05)", border: `1px solid rgba(16,185,129,0.2)`,
                borderRadius: 8, padding: "7px 12px",
              }}>
                <span style={{ color: "#10B981", fontSize: 13 }}>✓</span>
                <span style={{ color: textSecondary, fontSize: 12.5, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                  {u.originalName || u.filename || u}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      <div style={{ display: "flex", gap: 10, justifyContent: "flex-end", marginTop: 8 }}>
        <GhostBtn onClick={onClose}>Close</GhostBtn>
        <ActionBtn onClick={handleUpload} disabled={uploading || files.length === 0}>
          {uploading ? "Uploading…" : `Upload${files.length > 0 ? ` (${files.length})` : ""}`}
        </ActionBtn>
      </div>
    </Modal>
  );
}

// ─── Confirm Delete Modal ─────────────────────────────────────────────────────
function ConfirmDeleteModal({ partner, onConfirm, onClose, loading }) {
  return (
    <Modal title="Delete Partner" subtitle="This action cannot be undone." onClose={onClose}>
      <p style={{ color: textSecondary, fontSize: 13.5, lineHeight: 1.6, marginBottom: 24 }}>
        You are about to permanently delete partner <strong style={{ color: textPrimary }}>{partner.username}</strong>
        {partner.email ? ` (${partner.email})` : ""}. All associated requests will be unlinked.
      </p>
      <div style={{ display: "flex", gap: 10, justifyContent: "flex-end" }}>
        <GhostBtn onClick={onClose}>Cancel</GhostBtn>
        <ActionBtn onClick={onConfirm} disabled={loading} color="#DC2626" hoverColor="#b91c1c" textColor="#fff">
          {loading ? "Deleting…" : "Delete Partner"}
        </ActionBtn>
      </div>
    </Modal>
  );
}

// ─── Edit Partner Modal ───────────────────────────────────────────────────────
function EditPartnerModal({ partner, token, onClose, onSaved }) {
  const { success: ok, error: err } = useToast();
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    username: partner.username || "",
    email: partner.email || "",
    role: partner.role || "partner",
    password: "",
  });

  const set = (k) => (e) => setForm(p => ({ ...p, [k]: e.target.value }));

  const handleSave = async () => {
    const payload = { username: form.username, email: form.email, role: form.role };
    if (form.password) payload.password = form.password;
    try {
      setSaving(true);
      await axios.put(`${BASE_URL}/admin/partners/${partner.id}`, payload, {
        headers: { Authorization: `Bearer ${token}` },
      });
      ok("Partner updated", `${form.username} has been updated.`);
      onSaved();
      onClose();
    } catch (e) {
      err("Update failed", e?.response?.data?.message || "Could not update partner.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <Modal title="Edit Partner" subtitle={`ID #${partner.id}`} onClose={onClose}>
      <Field label="Username"><input style={inputStyle} value={form.username} onChange={set("username")} /></Field>
      <Field label="Email"><input style={inputStyle} type="email" value={form.email} onChange={set("email")} /></Field>
      <Field label="Role">
        <select style={selectStyle} value={form.role} onChange={set("role")}>
          <option value="partner">Partner</option>
          <option value="admin">Admin</option>
        </select>
      </Field>
      <Field label="New Password (leave blank to keep)">
        <input style={inputStyle} type="password" placeholder="••••••••" value={form.password} onChange={set("password")} />
      </Field>
      <div style={{ display: "flex", gap: 10, justifyContent: "flex-end", marginTop: 20 }}>
        <GhostBtn onClick={onClose}>Cancel</GhostBtn>
        <ActionBtn onClick={handleSave} disabled={saving}>{saving ? "Saving…" : "Save Changes"}</ActionBtn>
      </div>
    </Modal>
  );
}

// ─── Request Detail Modal ─────────────────────────────────────────────────────
function RequestDetailModal({ request, token, onClose, onStatusChange }) {
  const { success: ok, error: err } = useToast();
  const [updating, setUpdating] = useState(false);
  const [status, setStatus] = useState(request.status);
  const [documents, setDocuments] = useState([]);
  const [docsLoading, setDocsLoading] = useState(true);

  useEffect(() => {
    const fetchDocs = async () => {
      try {
        setDocsLoading(true);
        const { data } = await axios.get(
          `${BASE_URL}/admin/requests/${request.id}/documents`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setDocuments(data.documents || data.files || []);
      } catch { setDocuments([]); }
      finally { setDocsLoading(false); }
    };
    fetchDocs();
  }, [request.id, token]);

  const updateStatus = async (newStatus) => {
    try {
      setUpdating(true);
      await axios.patch(
        `${BASE_URL}/admin/requests/${request.id}/status`,
        { status: newStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setStatus(newStatus);
      ok("Status updated", `Request #${request.id} is now ${newStatus}.`);
      onStatusChange(request.id, newStatus);
    } catch (e) {
      err("Update failed", e?.response?.data?.message || "Could not update status.");
    } finally { setUpdating(false); }
  };

  const Row = ({ label, value }) => (
    <div style={{
      display: "flex", gap: 12, padding: "10px 0",
      borderBottom: `1px solid ${border}`, alignItems: "flex-start",
    }}>
      <div style={{ color: textMuted, fontSize: 11.5, textTransform: "uppercase", letterSpacing: "0.06em", minWidth: 130, paddingTop: 1 }}>{label}</div>
      <div style={{ color: textPrimary, fontSize: 13.5, flex: 1, wordBreak: "break-word" }}>
        {value || <span style={{ color: textMuted }}>—</span>}
      </div>
    </div>
  );

  const getFileIcon = (filename = "") => {
    const ext = filename.split(".").pop().toLowerCase();
    if (["jpg", "jpeg", "png", "gif", "webp"].includes(ext)) return "🖼️";
    if (ext === "pdf") return "📄";
    if (["doc", "docx"].includes(ext)) return "📝";
    return "📎";
  };

  return (
    <Modal
      title={`Request #${request.id}`}
      subtitle={`Submitted ${new Date(request.createdAt).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}`}
      onClose={onClose}
    >
      <Row label="Status" value={<StatusBadge status={status} />} />
      <Row label="Customer" value={request.customerName} />
      <Row label="Phone" value={request.customerPhone} />
      <Row label="Email" value={request.customerEmail} />
      <Row label="Location" value={request.memorialLocation} />
      <Row label="Package" value={request.packageType === "basic_annual" ? "Basic Annual — $549" : "Premium Annual — $749"} />
      <Row label="Price" value={`$${Number(request.packagePrice).toFixed(2)}`} />
      <Row label="Partner ID" value={request.partnerId ? `#${request.partnerId}` : "—"} />
      <Row label="Approved By" value={request.approvedBy} />
      <Row label="Approved At" value={request.approvedAt ? new Date(request.approvedAt).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }) : null} />
      <Row label="Denied By" value={request.deniedBy} />
      <Row label="Denied At" value={request.deniedAt ? new Date(request.deniedAt).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }) : null} />
      {request.notes && <Row label="Notes" value={request.notes} />}

      {/* Documents */}
      <div style={{ marginTop: 20 }}>
        <div style={{ color: textMuted, fontSize: 11.5, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 10 }}>Uploaded Documents</div>
        {docsLoading ? (
          <div style={{ padding: "14px 0", color: textMuted, fontSize: 12.5 }}>Loading documents…</div>
        ) : documents.length === 0 ? (
          <div style={{ padding: "14px 16px", backgroundColor: "#F9FAFB", border: `1px dashed ${border}`, borderRadius: 8, color: textMuted, fontSize: 12.5, textAlign: "center" }}>
            No documents uploaded yet.
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {documents.map((doc, i) => {
              const rawPath = doc.storagePath || doc.storage_path || "";
              const filename = rawPath.split(/[/\\]/).pop() || `File ${i + 1}`;
              const fileUrl = `http://localhost:5000/files/${filename}`;
              return (
                <div key={i} style={{
                  display: "flex", alignItems: "center", gap: 12,
                  backgroundColor: "#F9FAFB", border: `1px solid ${border}`,
                  borderRadius: 8, padding: "10px 14px", transition: "border-color .15s",
                }}
                  onMouseEnter={e => e.currentTarget.style.borderColor = borderPrimary}
                  onMouseLeave={e => e.currentTarget.style.borderColor = border}
                >
                  <div style={{
                    width: 36, height: 36, borderRadius: 6, backgroundColor: "rgba(22,105,169,0.08)",
                    border: `1px solid ${borderPrimary}`, display: "flex", alignItems: "center",
                    justifyContent: "center", fontSize: 18, flexShrink: 0,
                  }}>{getFileIcon(filename)}</div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ color: textPrimary, fontSize: 13, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{filename}</div>
                    {(doc.createdAt || doc.created_at) && (
                      <div style={{ color: textMuted, fontSize: 11, marginTop: 2 }}>
                        Uploaded {new Date(doc.createdAt || doc.created_at).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                      </div>
                    )}
                  </div>
                  <a href={fileUrl} target="_blank" rel="noopener noreferrer" style={{
                    color: primary, fontSize: 11.5, textDecoration: "none", flexShrink: 0,
                    border: `1px solid ${borderPrimary}`, borderRadius: 6, padding: "4px 10px",
                    backgroundColor: "rgba(22,105,169,0.06)", transition: "background .15s",
                  }}
                    onMouseEnter={e => e.currentTarget.style.backgroundColor = "rgba(22,105,169,0.14)"}
                    onMouseLeave={e => e.currentTarget.style.backgroundColor = "rgba(22,105,169,0.06)"}
                  >Open ↗</a>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Update Status */}
      <div style={{ marginTop: 20 }}>
        <div style={{ color: textMuted, fontSize: 11.5, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 10 }}>Update Status</div>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          {["pending_approval", "approved", "completed", "denied"].map(s => (
            <ActionBtn
              key={s}
              disabled={updating || status === s}
              onClick={() => updateStatus(s)}
              color={status === s ? "rgba(22,105,169,0.12)" : surfaceMid}
              hoverColor="rgba(22,105,169,0.1)"
              textColor={status === s ? primary : textMuted}
              style={{ border: `1px solid ${status === s ? borderPrimary : border}`, fontSize: 12 }}
            >
              {STATUS_STYLES[s]?.label || s}
            </ActionBtn>
          ))}
        </div>
      </div>

      <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 20 }}>
        <GhostBtn onClick={onClose}>Close</GhostBtn>
      </div>
    </Modal>
  );
}

// ─── Stat Card ────────────────────────────────────────────────────────────────
function StatCard({ label, value, accent }) {
  return (
    <div style={{
      backgroundColor: surface, border: `1px solid ${border}`,
      borderTop: `3px solid ${accent || primary}`,
      borderRadius: 12, padding: "18px 22px",
      boxShadow: "0 1px 4px rgba(0,0,0,0.05)",
    }}>
      <div style={{ color: textMuted, fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 8 }}>{label}</div>
      <div style={{ color: textPrimary, fontSize: 28, fontWeight: 700 }}>{value}</div>
    </div>
  );
}

// ─── Main Admin Dashboard ─────────────────────────────────────────────────────
export default function AdminDashboard({ token, adminName, onLogout }) {
  const { success: ok, error: err } = useToast();
  const navigate = useNavigate();
  const [tab, setTab] = useState("requests");

  const displayName = adminName || (() => {
    try { return JSON.parse(localStorage.getItem("admin"))?.email || "Admin"; }
    catch { return "Admin"; }
  })();

  const [requests, setRequests] = useState([]);
  const [reqLoading, setReqLoading] = useState(true);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [filterStatus, setFilterStatus] = useState("all");
  const [searchQ, setSearchQ] = useState("");
  const [partners, setPartners] = useState([]);
  const [partLoading, setPartLoading] = useState(true);
  const [editPartner, setEditPartner] = useState(null);
  const [deletePartner, setDeletePartner] = useState(null);
  const [deletingId, setDeletingId] = useState(null);
  const [uploadRequest, setUploadRequest] = useState(null);

  const fetchRequests = useCallback(async () => {
    try {
      setReqLoading(true);
      const { data } = await axios.get(`${BASE_URL}/admin/requests`, { headers: { Authorization: `Bearer ${token}` } });
      setRequests(data.requests || []);
    } catch { err("Error", "Failed to load requests."); }
    finally { setReqLoading(false); }
  }, [token]);

  const fetchPartners = useCallback(async () => {
    try {
      setPartLoading(true);
      const { data } = await axios.get(`${BASE_URL}/admin/partners`, { headers: { Authorization: `Bearer ${token}` } });
      setPartners(data.partners || []);
    } catch { err("Error", "Failed to load partners."); }
    finally { setPartLoading(false); }
  }, [token]);

  useEffect(() => { fetchRequests(); fetchPartners(); }, []);

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("admin");
    if (typeof onLogout === "function") onLogout();
    navigate("/admin");
  };

  const handleDeletePartner = async () => {
    try {
      setDeletingId(deletePartner.id);
      await axios.delete(`${BASE_URL}/admin/partners/${deletePartner.id}`, { headers: { Authorization: `Bearer ${token}` } });
      ok("Partner deleted", `${deletePartner.username} has been removed.`);
      setDeletePartner(null);
      fetchPartners();
    } catch (e) {
      err("Delete failed", e?.response?.data?.message || "Could not delete partner.");
    } finally { setDeletingId(null); }
  };

  const handleStatusChange = (id, newStatus) => {
    setRequests(prev => prev.map(r => r.id === id ? { ...r, status: newStatus } : r));
  };

  const filteredRequests = requests.filter(r => {
    const matchStatus = filterStatus === "all" || r.status === filterStatus;
    const q = searchQ.toLowerCase();
    const matchSearch = !q ||
      r.customerName?.toLowerCase().includes(q) ||
      r.memorialLocation?.toLowerCase().includes(q) ||
      r.customerEmail?.toLowerCase().includes(q) ||
      String(r.id).includes(q);
    return matchStatus && matchSearch;
  });

  const stats = {
    total: requests.length,
    pending: requests.filter(r => r.status === "pending_approval").length,
    approved: requests.filter(r => r.status === "approved").length,
    completed: requests.filter(r => r.status === "completed").length,
    partners: partners.length,
    revenue: requests.filter(r => r.status !== "pending_approval").reduce((s, r) => s + Number(r.packagePrice || 0), 0),
  };

  const Th = ({ children }) => (
    <th style={{ padding: "11px 16px", textAlign: "left", color: textMuted, fontSize: 10.5, letterSpacing: "0.1em", textTransform: "uppercase", fontWeight: 600, whiteSpace: "nowrap", backgroundColor: "#F8FAFC" }}>
      {children}
    </th>
  );

  // Shared inline action button style factory
  const inlineBtn = (color, hoverBg) => ({
    base: { background: "none", border: `1px solid ${border}`, color, borderRadius: 6, padding: "5px 12px", fontSize: 11.5, cursor: "pointer", transition: "all .15s" },
    enter: { borderColor: color, backgroundColor: hoverBg },
    leave: { borderColor: border, backgroundColor: "transparent" },
  });

  const btnGold   = inlineBtn(primary, "rgba(22,105,169,0.08)");
  const btnGreen  = inlineBtn("#059669", "rgba(5,150,105,0.07)");
  const btnRed    = inlineBtn("#DC2626", "rgba(220,38,38,0.07)");
  const btnBlue   = inlineBtn("#0284C7", "rgba(2,132,199,0.07)");

  return (
    <div style={{ minHeight: "100vh", backgroundColor: bg, fontFamily: "'Inter', system-ui, sans-serif", color: textPrimary }}>

      {/* Top bar accent */}
      <div style={{ height: 4, background: "linear-gradient(90deg, #1669A9, #1E90CF, #1669A9)" }} />

      {/* ── Top Nav ── */}
      <header style={{
        borderBottom: `1px solid ${border}`, backgroundColor: surface,
        position: "sticky", top: 0, zIndex: 40,
        boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
      }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "12px 24px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <Logo />
          <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
            <span style={{ color: textMuted, fontSize: 12.5 }}>
              Signed in as <span style={{ color: primary, fontWeight: 600 }}>{displayName}</span>
            </span>
            <button
              onClick={handleLogout}
              style={{ background: "none", border: `1px solid ${border}`, color: textMuted, borderRadius: 8, padding: "7px 16px", fontSize: 12.5, cursor: "pointer", transition: "all .2s" }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = borderPrimary; e.currentTarget.style.color = primary; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = border; e.currentTarget.style.color = textMuted; }}
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      <main style={{ maxWidth: 1280, margin: "0 auto", padding: "28px 24px" }}>

        {/* Page title */}
        <div style={{ marginBottom: 28 }}>
          <h1 style={{ fontSize: 28, fontWeight: 700, color: textPrimary, margin: 0 }}>Admin Dashboard</h1>
          <p style={{ color: textMuted, fontSize: 13, marginTop: 4 }}>Manage all restoration requests and partners for the platform.</p>
        </div>

        {/* Stats */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: 14, marginBottom: 28 }}>
          <StatCard label="Total Requests" value={stats.total} accent={primary} />
          <StatCard label="Pending"         value={stats.pending}   accent="#F59E0B" />
          <StatCard label="Approved"        value={stats.approved}  accent={primary} />
          <StatCard label="Completed"       value={stats.completed} accent="#10B981" />
          <StatCard label="Partners"        value={stats.partners}  accent="#0284C7" />
          <StatCard label="Revenue"         value={`$${stats.revenue.toLocaleString()}`} accent="#6366F1" />
        </div>

        {/* Tabs */}
        <div style={{ display: "flex", gap: 8, marginBottom: 22 }}>
          <Tab label="Requests" active={tab === "requests"} onClick={() => setTab("requests")} count={requests.length} />
          <Tab label="Partners" active={tab === "partners"} onClick={() => setTab("partners")} count={partners.length} />
        </div>

        {/* ══ REQUESTS TAB ══ */}
        {tab === "requests" && (
          <div style={{ backgroundColor: surface, border: `1px solid ${border}`, borderRadius: 12, overflow: "hidden", boxShadow: "0 1px 4px rgba(0,0,0,0.05)", borderTop: `3px solid ${primary}` }}>
            {/* Toolbar */}
            <div style={{ padding: "14px 18px", borderBottom: `1px solid ${border}`, display: "flex", gap: 10, flexWrap: "wrap", alignItems: "center", backgroundColor: "#FAFBFC" }}>
              <input
                placeholder="Search customer, location, email, ID…"
                value={searchQ} onChange={e => setSearchQ(e.target.value)}
                style={{ ...inputStyle, width: 260, height: 36, fontSize: 12.5 }}
              />
              <select value={filterStatus} onChange={e => setFilterStatus(e.target.value)}
                style={{ ...selectStyle, width: 175, height: 36, fontSize: 12.5 }}>
                <option value="all">All Statuses</option>
                <option value="pending_approval">Pending Approval</option>
                <option value="approved">Approved</option>
                <option value="completed">Completed</option>
                <option value="denied">Denied</option>
              </select>
              <span style={{ color: textMuted, fontSize: 12, marginLeft: "auto" }}>{filteredRequests.length} result{filteredRequests.length !== 1 ? "s" : ""}</span>
            </div>

            {reqLoading ? (
              <div style={{ padding: "48px 0", textAlign: "center", color: textMuted, fontSize: 13 }}>Loading requests…</div>
            ) : filteredRequests.length === 0 ? (
              <div style={{ padding: "48px 0", textAlign: "center", color: textMuted, fontSize: 13 }}>No requests match your filters.</div>
            ) : (
              <div style={{ overflowX: "auto" }}>
                <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
                  <thead>
                    <tr>
                      <Th>ID</Th><Th>Customer</Th><Th>Email</Th><Th>Location</Th>
                      <Th>Package</Th><Th>Partner</Th><Th>Status</Th>
                      <Th>Approved By</Th><Th>Approved At</Th>
                      <Th>Denied By</Th><Th>Denied At</Th>
                      <Th>Submitted</Th><Th>Action</Th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredRequests.map((r, i) => (
                      <tr key={r.id} style={{ borderTop: `1px solid ${border}`, backgroundColor: i % 2 === 0 ? surface : "#FAFBFC" }}>
                        <td style={{ padding: "13px 16px", color: textMuted, fontSize: 12 }}>#{r.id}</td>
                        <td style={{ padding: "13px 16px", color: textPrimary, fontWeight: 600 }}>{r.customerName}</td>
                        <td style={{ padding: "13px 16px", color: textSecondary, fontSize: 12 }}>{r.customerEmail}</td>
                        <td style={{ padding: "13px 16px", color: textSecondary, maxWidth: 180, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{r.memorialLocation}</td>
                        <td style={{ padding: "13px 16px", color: textPrimary, whiteSpace: "nowrap" }}>
                          {r.packageType === "basic_annual" ? "Basic $549" : "Premium $749"}
                        </td>
                        <td style={{ padding: "13px 16px", color: textMuted, fontSize: 12 }}>
                          {r.partner ? r.partner.username : (r.partnerId ? `#${r.partnerId}` : "—")}
                        </td>
                        <td style={{ padding: "13px 16px" }}><StatusBadge status={r.status} /></td>
                        <td style={{ padding: "13px 16px", color: textSecondary, fontSize: 12 }}>{r.approvedBy || <span style={{ color: textMuted }}>—</span>}</td>
                        <td style={{ padding: "13px 16px", color: textSecondary, whiteSpace: "nowrap", fontSize: 12 }}>
                          {r.approvedAt ? new Date(r.approvedAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) : <span style={{ color: textMuted }}>—</span>}
                        </td>
                        <td style={{ padding: "13px 16px", color: textSecondary, fontSize: 12 }}>{r.deniedBy || <span style={{ color: textMuted }}>—</span>}</td>
                        <td style={{ padding: "13px 16px", color: textSecondary, whiteSpace: "nowrap", fontSize: 12 }}>
                          {r.deniedAt ? new Date(r.deniedAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) : <span style={{ color: textMuted }}>—</span>}
                        </td>
                        <td style={{ padding: "13px 16px", color: textSecondary, whiteSpace: "nowrap", fontSize: 12 }}>
                          {new Date(r.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                        </td>
                        <td style={{ padding: "13px 16px" }}>
                          <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
                            {r.status === "approved" && (
                              <button
                                onClick={() => setUploadRequest(r)}
                                style={btnBlue.base}
                                onMouseEnter={e => Object.assign(e.currentTarget.style, btnBlue.enter)}
                                onMouseLeave={e => Object.assign(e.currentTarget.style, btnBlue.leave)}
                              >Upload</button>
                            )}
                            <button
                              onClick={async () => {
                                try {
                                  const { data } = await axios.get(`${BASE_URL}/admin/requests/${r.id}`, { headers: { Authorization: `Bearer ${token}` } });
                                  setSelectedRequest(data.request);
                                } catch { setSelectedRequest(r); }
                              }}
                              style={btnGold.base}
                              onMouseEnter={e => Object.assign(e.currentTarget.style, btnGold.enter)}
                              onMouseLeave={e => Object.assign(e.currentTarget.style, btnGold.leave)}
                            >View</button>
                            {r.status === "pending_approval" && (
                              <>
                                <button
                                  onClick={async () => {
                                    try {
                                      await axios.patch(`${BASE_URL}/admin/requests/${r.id}/status`, { status: "approved" }, { headers: { Authorization: `Bearer ${token}` } });
                                      ok("Approved", `Request #${r.id} has been approved.`);
                                      handleStatusChange(r.id, "approved");
                                    } catch (e) { err("Failed", e?.response?.data?.message || "Could not approve request."); }
                                  }}
                                  style={btnGreen.base}
                                  onMouseEnter={e => Object.assign(e.currentTarget.style, btnGreen.enter)}
                                  onMouseLeave={e => Object.assign(e.currentTarget.style, btnGreen.leave)}
                                >Approve</button>
                                <button
                                  onClick={async () => {
                                    try {
                                      await axios.patch(`${BASE_URL}/admin/requests/${r.id}/status`, { status: "denied" }, { headers: { Authorization: `Bearer ${token}` } });
                                      ok("Denied", `Request #${r.id} has been denied.`);
                                      handleStatusChange(r.id, "denied");
                                    } catch (e) { err("Failed", e?.response?.data?.message || "Could not update request."); }
                                  }}
                                  style={btnRed.base}
                                  onMouseEnter={e => Object.assign(e.currentTarget.style, btnRed.enter)}
                                  onMouseLeave={e => Object.assign(e.currentTarget.style, btnRed.leave)}
                                >Deny</button>
                              </>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* ══ PARTNERS TAB ══ */}
        {tab === "partners" && (
          <div style={{ backgroundColor: surface, border: `1px solid ${border}`, borderRadius: 12, overflow: "hidden", boxShadow: "0 1px 4px rgba(0,0,0,0.05)", borderTop: `3px solid #0284C7` }}>
            <div style={{ padding: "14px 18px 13px", borderBottom: `1px solid ${border}`, display: "flex", alignItems: "center", justifyContent: "space-between", backgroundColor: "#FAFBFC" }}>
              <div style={{ color: textPrimary, fontSize: 15, fontWeight: 700 }}>All Partners</div>
              <span style={{ color: textMuted, fontSize: 12 }}>{partners.length} registered</span>
            </div>

            {partLoading ? (
              <div style={{ padding: "48px 0", textAlign: "center", color: textMuted, fontSize: 13 }}>Loading partners…</div>
            ) : partners.length === 0 ? (
              <div style={{ padding: "48px 0", textAlign: "center", color: textMuted, fontSize: 13 }}>No partners found.</div>
            ) : (
              <div style={{ overflowX: "auto" }}>
                <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
                  <thead>
                    <tr><Th>ID</Th><Th>Username</Th><Th>Email</Th><Th>Role</Th><Th>Requests</Th><Th>Created</Th><Th>Actions</Th></tr>
                  </thead>
                  <tbody>
                    {partners.map((p, i) => {
                      const reqCount = requests.filter(r => r.partnerId === p.id).length;
                      return (
                        <tr key={p.id} style={{ borderTop: `1px solid ${border}`, backgroundColor: i % 2 === 0 ? surface : "#FAFBFC" }}>
                          <td style={{ padding: "13px 16px", color: textMuted, fontSize: 12 }}>#{p.id}</td>
                          <td style={{ padding: "13px 16px", color: textPrimary, fontWeight: 600 }}>{p.username}</td>
                          <td style={{ padding: "13px 16px", color: textSecondary, fontSize: 12 }}>{p.email || <span style={{ color: textMuted }}>—</span>}</td>
                          <td style={{ padding: "13px 16px" }}>
                            <span style={{
                              fontSize: 11, letterSpacing: "0.06em", padding: "3px 9px", borderRadius: 999,
                              backgroundColor: p.role === "admin" ? "rgba(22,105,169,0.1)" : "rgba(2,132,199,0.08)",
                              color: p.role === "admin" ? primary : "#0284C7",
                              border: `1px solid ${p.role === "admin" ? borderPrimary : "rgba(2,132,199,0.25)"}`,
                            }}>{p.role}</span>
                          </td>
                          <td style={{ padding: "13px 16px", color: textSecondary }}>{reqCount}</td>
                          <td style={{ padding: "13px 16px", color: textSecondary, fontSize: 12, whiteSpace: "nowrap" }}>
                            {new Date(p.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                          </td>
                          <td style={{ padding: "13px 16px" }}>
                            <div style={{ display: "flex", gap: 7 }}>
                              <button onClick={() => setEditPartner(p)}
                                style={btnGold.base}
                                onMouseEnter={e => Object.assign(e.currentTarget.style, btnGold.enter)}
                                onMouseLeave={e => Object.assign(e.currentTarget.style, btnGold.leave)}
                              >Edit</button>
                              <button onClick={() => setDeletePartner(p)}
                                style={btnRed.base}
                                onMouseEnter={e => Object.assign(e.currentTarget.style, btnRed.enter)}
                                onMouseLeave={e => Object.assign(e.currentTarget.style, btnRed.leave)}
                              >Delete</button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </main>

      {/* Modals */}
      {selectedRequest && <RequestDetailModal request={selectedRequest} token={token} onClose={() => setSelectedRequest(null)} onStatusChange={handleStatusChange} />}
      {editPartner && <EditPartnerModal partner={editPartner} token={token} onClose={() => setEditPartner(null)} onSaved={fetchPartners} />}
      {deletePartner && <ConfirmDeleteModal partner={deletePartner} loading={!!deletingId} onClose={() => setDeletePartner(null)} onConfirm={handleDeletePartner} />}
      {uploadRequest && (
        <UploadDocumentsModal
          request={uploadRequest}
          token={token}
          onClose={() => {
            setUploadRequest(null);
            if (selectedRequest && selectedRequest.id === uploadRequest.id) {
              axios.get(`${BASE_URL}/admin/requests/${uploadRequest.id}`, { headers: { Authorization: `Bearer ${token}` } })
                .then(({ data }) => setSelectedRequest(data.request)).catch(() => {});
            }
          }}
        />
      )}
    </div>
  );
}