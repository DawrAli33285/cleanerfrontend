import { useState, useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "../baseurl";
import { useToast } from "../components/toast";

/**
 * Lasting Legacy Cleaners — Partner Dashboard Page
 * Restyled to match Collections Connector theme (aligned with LoginPage)
 *
 * Brand:
 *  - Background: #F5F7FA
 *  - Card:       #FFFFFF
 *  - Primary:    #1669A9
 *  - Dark:       #1A1A2E
 *  - Text:       #333333 / #6B7280
 *  - Accent:     #1E90CF
 */
const BILLING_LINKS = {
  basic_annual: "https://link.waveapps.com/6s87u2-fhf6gt",
  premium_annual: "https://link.waveapps.com/7nvtce-ks963v",
};

function Logo({ size = 64 }) {
  return (
    <div className="flex items-center gap-3">
      <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 520 372">
        <path d="M0 0 C0.99 0.99 0.99 0.99 2 2 C1.625 4.125 1.625 4.125 1 6 C-3.20145608 4.25924326 -7.22130026 2.38995147 -11.23779297 0.24658203 C-18.24869382 -3.45568152 -25.35277951 -6.37071794 -32.875 -8.875 C-62.9343382 -18.58437312 -93.22329581 -17.0555125 -119.125 -4.25 C-145.17703328 10.14503523 -157.74108797 24.5065593 -168 40 C-167.154375 41.2575 -166.30875 40.515 -165.4375 39.75 C-161.21509814 36.2363228 -156.53736913 32.88597906 -151 32 C-150.47761979 39.95442587 -154.37647695 46.65741206 -159.38037109 52.65429688 C-162.72895899 56.31213866 -166.33148555 59.66675376 -170 63 C-177.65662651 70 -177.65662651 70 -180 70 C-183.65244415 80.08074584 -185.367759 89.25326466 -185 100 C-180.4361997 83.81139711 -175.27021688 71.92738231 -162.94921875 64.81640625 C-161 64 -161 64 -158 64 C-158.58606294 69.66952194 -159.61880918 74.91791388 -161.25 80.375 C-163.681097 88.39767875 -165.96649419 93.7462261 -169 99 C-171.22558594 99.56460938 -173.37306432 103.64871125 -178.0625 107.625 C-181.51651125 110.43092091 -181.51651125 110.43092091 -184 114 C-184.09050382 126.65243434 -181.61548656 141.04831217 -175 152 C-173.02320313 152.10539063 -173.04640625 151.21078125 -173.0703125 150.2890625 C-173.18043474 142.91087242 -172.84659266 136.15554657 -171 129 C-169.68 129 -168.36 129 -167 129 C-166.06953067 130.86093867 -165.14004133 132.72237228 -164.21484375 134.5859375 C-156.16364213 151.29732727 -155.6579668 158.00412893 -155.4375 165.5 C-155.50426366 178.23294731 -155.50426366 178.23294731 -150.4375 189.5 C-147.75552734 193.03734375 -147.75552734 193.03734375 -147 194 C-150.98188725 180.28357246 -152.77271767 171.52613185 -152 161 C-148.54173828 160.804375 -148.54173828 160.804375 -148.07421875 161.625 C-131.61212031 185.83894743 -126.28675109 197.31285929 -123.640625 212.171875 C-123.13532642 215.18395084 -123.13532642 215.18395084 -121 218 C-113.575 217.01 -113.575 217.01 -106 216 C-118.8799626 208.11301842 -124.43578898 199.42261706 -128 189 C-128.15625 186.109375 -128.15625 186.109375 -128 184 C-121.71356263 184.9768687 -116.52255233 187.96801049 -111 191 C-102.61026131 196.18221981 -99.13615435 202.34267282 -95.296875 208.44140625 C-91.84619452 214.38252773 -91.84619452 214.38252773 -86.265625 217.92578125 C-72.39327287 219.36919942 -66.63424573 218.6809396 -59.1875 216.125 C-42.50042861 210.25772976 -29.53716686 203.25167422 -18 194 C-7.71259319 186.02888476 -1.37185414 179.1947463 5 172 C5.99 172.33 6.98 172.66 8 173 C6.7188338 177.70674428 5.02398675 180.52414178 1.6875 184.0625 C-20.04544333 205.44317117 -35.59836779 215.63779151 -54.67578125 221.87109375 C-57.80944627 222.6620559 -57.80944627 222.6620559 -59 224 C-50.34781483 227.45539626 -44.55152981 230.04987302 -39 234 C-39 234.66 -39 235.32 -39 236 C-46.59963506 236.63715045 -52.50365348 234.32710768 -59.5625 231.6875 C-81.59209539 223.8373135 -107.38568382 218.79791334 -130 228 C-133.8517792 229.91879695 -137.45618269 232.1185945 -141.046875 234.48828125 C-144 236 -144 236 -146.890625 235.73046875 C-149 235 -149 235 -149 235 C-146.71762284 229.17015664 -141.13108828 226.17157819 -136 223 C-132.99298528 221.69466267 -130.18247582 220.83474776 -127 220 C-130.17056811 216.4182859 -133.68682264 214.36841244 -137.9375 212.3125 C-144.89251988 208.86010111 -149.41755475 207.94926643 -155.0625 207.640625 C-166.32050529 206.92204911 -175.7590844 205.96399937 -186 201 C-194.81842347 197.29062733 -194.81842347 197.29062733 -197 196 C-188.74259525 187.93046883 -176.75247191 187.40015367 -166.5 189.8125 C-159.46686778 192.41101893 -156 194 C-166.33698197 182.39991344 -171.85649142 179.65635405 -180.75 177.0625 C-198.42381823 170.57467576 -206.56640625 163.89453125 -209.01099125 161.85352144 -212.25 160.4375 C-215 159 -215 159 -216 156 C-213.55959975 153.55959975 -207.24501349 154.45143717 -203.86303711 154.39306641 C-194.5381755 154.56505733 -187.82050592 158.27925825 -180 163 C-176.38671875 164.38253906 -179.73604436 158.95895756 -183.875 150.375 C-187.07509317 142.84144733 -193.35383594 138.38364012 -200 134 C-208.42211298 126.89384218 -211.97125371 118.65122351 -215.3125 108.375 C-217.6179062 101.09095774 -218.29099903 97.04849477 -218 92 C-213.71019766 92.52187376 -210.86830829 95.18051174 -207.6875 97.875 C-199.62459405 104.90120319 -195.67093141 111.50155717 -192 119 C-191.7219095 105.54350971 -192.35957204 95.7309574 -198.43579102 83.48974609 C-201.82833494 76.60978743 -203.34693445 70.33753243 -203.25 62.6875 C-203.14969374 54.80096401 -202.50084919 49.45397874 -201 44 C-196.07237604 46.14017566 -194.19860502 49.19358588 -192 54 C-190.36705534 58.91707917 -189.17522846 63.957679 -188 69 C-186.64574642 67.87877355 -186.64574642 67.87877355 -186.96582031 64.97167969 C-187.10544549 59.43491878 -187.13144069 57.94793774 -187.15625 56.4609375 C-187.73255169 35.81306751 -185.22411652 25.31177294 -177.6875 13.6875 C-175.05472656 9.59910156 -174.53523438 8.81148437 -174 8 C-173.01 8.33 -172.02 8.66 -171 9 C-170.505 19.395 -170.505 19.395 -170 30 C-145.59370203 0.11273466 -119.21828589 -17.39559974 -86.18359375 -21.3359375 C-56.46238008 -24.203434 -24.28005025 -18.3754678 0 0 Z" fill="#1669A9" transform="translate(219,23)" />
        <path d="M0 0 C11.22 0 22.44 0 34 0 C33.67 1.32 33.34 2.64 33 4 C29.535 5.485 29.535 5.485 26 7 C26 35.05 26 63.1 26 92 C29.96 92.66 33.92 93.32 38 94 C37.88200042 86.63090704 37.75777029 79.26195596 37.62768555 71.89306641 C37.44509243 60.76846132 37.38136657 57.16940058 37.31640625 53.5703125 C37.2358445 48.59342361 37.2358445 48.59342361 37.20532227 47.00048828 C37.1389322 41.95924846 37.1389322 41.95924846 36 40 C34.02111039 39.27306096 32.02045442 38.60183749 30 38 C30 36.68 30 35.36 30 34 C41.55 34 53.1 34 65 34 C65 35.32 65 36.64 65 38 C62.03 38.99 59.06 39.98 56 41 C55.26743059 50.13095449 54.89370394 59.2147466 54.875 68.375 C54.87455715 77.12601236 55.29384867 83.02425467 56 89 C60.62835605 83.85738217 63.76503079 78.62772205 66 72.0625 C67 70 67 70 69.0625 69.125 C69.701875 69.08375 70.34125 69.0425 71 69 C71.33 69.33 71.66 69.66 72 70 C71.95805864 72.06457311 71.84190958 74.12771106 71.6953125 76.1875 C71.60636719 77.44304687 71.51742187 78.69859375 71.42578125 79.9921875 C71.12566773 83.99107532 70.98605611 85.99929073 70.84765625 88.0078125 C70.12865102 97.87134898 70.12865102 97.87134898 69 99 C64.33154772 99.14426614 59.67134047 99.04208415 55 99 C55 107.58 55 116.16 55 125 C58.609375 124.9175 62.21875 124.835 65.9375 124.75 C77.41482419 124.43051063 84.10528899 122.78719508 90.25 117.3125 C93.10206465 114.23195504 94.91985441 110.72030357 96.7265625 106.953125 C98.2156641 104.66922684 99.49807209 103.99232584 102 103 C102.99268642 106.84258704 102.91845185 109.5843351 102.07421875 113.44921875 C101.85443359 114.46177734 101.63464844 115.47433594 101.40820312 116.51757812 C100.3481543 121.27401367 100.3481543 121.27401367 100.00195312 122.89257812 C98.26254618 130.73745382 98.26254618 130.73745382 96 133 C93.21591187 133.24050903 93.21591187 133.24050903 89.62255859 133.22705078 C85.47694704 133.22654065 83.31283364 133.2109712 81.1484375 133.1953125 C72.70163257 133.17909548 68.75286871 133.1594426 64.80401611 133.1373291 C56.74718876 133.10773776 52.71875 133.09765625 52.71875 133.09765625 C44.81243259 133.07619711 36.90623455 133.04205495 29 133 C28.505 131.02 28.505 131.02 28 129 C29.13179687 128.46890625 31.18179688 127.48890625 31.9375 127.125 C36.16332459 125.1315023 36.16332459 125.1315023 37 123 C37.08449628 121.2595583 37.10723024 119.51590278 37.09765625 117.7734375 C37.07187988 112.59338867 37.0625 111.375 37 100 C18.685 99.505 18.685 99.505 0 99 C0 97.68 0 96.36 0 95 C7.01203704 92.47484999 7.01203704 92.47484999 7.71357727 90.3289032 C8.09831023 87.2006395 8.13573201 84.14028821 8.14526367 80.98754883 C8.16689361 74.26205025 8.16796875 71.95703125 8.16796875 71.95703125 C8.18404138 63.75376712 8.18589531 60.37872988 8.18530273 57.00366211 C8.19882509 48.39190858 8.21607494 44.08598804 8.21607494 44.08598804 C8.22922033 37.43363876 8.22869301 34.1074276 8.22869301 34.1074276 C8.42179271 17.50811957 8.42179271 17.50811957 6 6 C3.66386669 4.33326425 1.81967257 3.78324238 -1 3 C-0.67 2.01 -0.34 1.02 0 0 Z" fill="#1669A9" transform="translate(97,48)" />
      </svg>
    </div>
  );
}

function StatusBadge({ status }) {
  let bg = "#F3F4F6";
  let color = "#6B7280";
  let border = "#E5E7EB";
  if (status === "Pending Approval") {
    bg = "#FEF3C7";
    color = "#92400E";
    border = "#FDE68A";
  } else if (status === "Approved") {
    bg = "#DBEAFE";
    color = "#1669A9";
    border = "#BFDBFE";
  } else if (status === "Completed") {
    bg = "#D1FAE5";
    color = "#065F46";
    border = "#A7F3D0";
  }else if (status === "Denied") {
    bg = "#FEE2E2";
    color = "#991B1B";
    border = "#FECACA";
  }
  return (
    <span
      className="inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-medium whitespace-nowrap"
      style={{ backgroundColor: bg, color, borderColor: border }}
    >
      {status}
    </span>
  );
}

export default function DashboardPage({ partnerName = "Partner", token, onLogout }) {
  const { success: toastSuccess, error: toastError } = useToast();
  const [active, setActive] = useState([]);
  const [completed, setCompleted] = useState([]);
  const [showNew, setShowNew] = useState(false);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [selectedPhotos, setSelectedPhotos] = useState([]);



  const [showPayment, setShowPayment] = useState(false);
const [submittedPkg, setSubmittedPkg] = useState(null);

  const mapRequest = (r) => ({
    id: r.id,
    customer: r.customerName,
    location: r.memorialLocation,
    pkg: r.packageType === "basic_annual" ? "Basic Annual $549" : "Premium Annual $749",
    status:
    r.status === "pending_approval"
      ? "Pending Approval"
      : r.status === "approved"
      ? "Approved"
      : r.status === "denied"
      ? "Denied"
      : "Completed",
    date: new Date(r.createdAt).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }),
  });

  const fetchRequests = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`${BASE_URL}/`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log(data)
      console.log('data')
      const all = data.requests.map(mapRequest);
      setActive(all.filter((r) => r.status === "Pending Approval" || r.status === "Approved"));
      setCompleted(all.filter((r) => r.status === "Completed" || r.status === "Denied"));
    } catch (err) {
      toastError("Failed to load", "Could not fetch requests. Please refresh.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const handleLogout = () => {
    if (typeof onLogout === "function") onLogout();
  };

  const submitNewRequest = async (e) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const pkg = String(fd.get("pkg") || "basic_annual");

    const payload = new FormData();
    payload.append("packageType", pkg);
    payload.append("packagePrice", pkg === "basic_annual" ? "549" : "749");
    payload.append("customerName", String(fd.get("customer") || ""));
    payload.append("customerPhone", String(fd.get("phone") || ""));
    payload.append("customerEmail", String(fd.get("email") || ""));
    payload.append("memorialLocation", String(fd.get("location") || ""));
    payload.append("notes", String(fd.get("notes") || ""));
    selectedPhotos.forEach((file) => payload.append("photos", file));

    try {
      setSubmitting(true);
      await axios.post(`${BASE_URL}/create-request`, payload, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const selectedPkg = pkg;
      console.log("pkg selected:", selectedPkg, "→ link:", BILLING_LINKS[selectedPkg]);
      toastSuccess("Request submitted", "Your request is pending approval.");
      setShowNew(false);
      setSelectedPhotos([]);
      setSubmittedPkg(selectedPkg);
      setShowPayment(true);
      fetchRequests();
    } catch (err) {
      const msg = err?.response?.data?.message || "Failed to submit request.";
      toastError("Submission failed", msg);
    } finally {
      setSubmitting(false);
    }
  };

  const inputStyle = {
    backgroundColor: "#F9FAFB",
    border: "1px solid #D1D5DB",
    color: "#1A1A2E",
    outline: "none",
  };

  const handleInputFocus = (e) => {
    e.target.style.borderColor = "#1669A9";
    e.target.style.boxShadow = "0 0 0 3px rgba(22, 105, 169, 0.12)";
  };

  const handleInputBlur = (e) => {
    e.target.style.borderColor = "#D1D5DB";
    e.target.style.boxShadow = "none";
  };

  return (
    <div
      className="min-h-screen"
      style={{
        backgroundColor: "#F5F7FA",
        fontFamily: "'Poppins', 'Roboto', system-ui, sans-serif",
      }}
    >
      {/* Decorative top bar */}
      <div
        className="fixed top-0 left-0 right-0 h-1 z-40"
        style={{ background: "linear-gradient(90deg, #1669A9, #1E90CF, #1669A9)" }}
      />

      {/* Top nav */}
      <header
        className="border-b"
        style={{
          borderColor: "#E5EAF0",
          backgroundColor: "#FFFFFF",
          boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
        }}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 py-4 flex items-center justify-between gap-4">
          <Logo size={40} />
          <div className="flex items-center gap-4 sm:gap-6">
            <span className="hidden sm:block text-sm" style={{ color: "#333333" }}>
              Welcome,{" "}
              <span className="font-semibold" style={{ color: "#1669A9" }}>
                {partnerName}
              </span>
            </span>
            <button
              onClick={handleLogout}
              className="text-xs sm:text-sm font-medium transition"
              style={{ color: "#6B7280" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#1669A9")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "#6B7280")}
            >
              Logout
            </button>
            <button
              onClick={() => {
                window.location.href = "/app/account";
              }}
              className="text-xs sm:text-sm font-medium transition"
              style={{ color: "#6B7280" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#1669A9")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "#6B7280")}
            >
              My Account
            </button>
            <button
              onClick={() => {
                window.location.href = "/app/support";
              }}
              className="text-xs sm:text-sm font-medium transition"
              style={{ color: "#6B7280" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#1669A9")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "#6B7280")}
            >
              Support
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 sm:px-6 py-8 sm:py-10">
        <p className="sm:hidden text-sm mb-4" style={{ color: "#333333" }}>
          Welcome,{" "}
          <span className="font-semibold" style={{ color: "#1669A9" }}>
            {partnerName}
          </span>
        </p>

        {/* Header + CTA */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl sm:text-3xl font-semibold" style={{ color: "#1A1A2E" }}>
              Restoration Requests
            </h1>
            <p className="text-sm mt-1" style={{ color: "#6B7280" }}>
              Manage your memorial restoration requests
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowNew(true)}
              className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 h-11 px-6 rounded-lg text-sm font-semibold text-white transition"
              style={{ backgroundColor: "#1669A9" }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#1E90CF")}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#1669A9")}
            >
              <span className="text-lg leading-none">+</span> New Request
            </button>
          </div>
        </div>

        {/* Active Requests */}
        <section
          className="rounded-2xl overflow-hidden mb-8"
          style={{
            backgroundColor: "#FFFFFF",
            border: "1px solid #E5EAF0",
            boxShadow: "0 4px 24px rgba(22, 105, 169, 0.08), 0 1px 3px rgba(0,0,0,0.06)",
            borderLeft: "4px solid #1669A9",
          }}
        >
          <div
            className="px-5 sm:px-6 py-4 border-b flex items-center justify-between"
            style={{ borderColor: "#E5EAF0" }}
          >
            <h2 className="text-lg font-semibold" style={{ color: "#1A1A2E" }}>
              Active Requests
            </h2>
            <span className="text-xs font-medium" style={{ color: "#6B7280" }}>
              {active.length} total
            </span>
          </div>

          {loading ? (
            <div className="px-6 py-8 text-center text-sm" style={{ color: "#6B7280" }}>
              Loading requests…
            </div>
          ) : active.length === 0 ? (
            <div className="px-6 py-8 text-center text-sm" style={{ color: "#6B7280" }}>
              No active requests yet.
            </div>
          ) : (
            <>
              {/* Desktop table */}
              <div className="hidden md:block overflow-x-auto">
                <table className="w-full text-sm">
                  <thead style={{ backgroundColor: "#F9FAFB" }}>
                    <tr className="text-left" style={{ color: "#6B7280" }}>
                      <th className="px-6 py-3 font-medium">Customer</th>
                      <th className="px-6 py-3 font-medium">Memorial Location</th>
                      <th className="px-6 py-3 font-medium">Package</th>
                      <th className="px-6 py-3 font-medium">Status</th>
                      <th className="px-6 py-3 font-medium">Submitted</th>
                    </tr>
                  </thead>
                  <tbody>
                    {active.map((r) => (
                      <tr key={r.id} className="border-t" style={{ borderColor: "#E5EAF0" }}>
                        <td className="px-6 py-4 font-medium" style={{ color: "#1A1A2E" }}>
                          {r.customer}
                        </td>
                        <td className="px-6 py-4" style={{ color: "#333333" }}>
                          {r.location}
                        </td>
                        <td className="px-6 py-4" style={{ color: "#1A1A2E" }}>
                          {r.pkg}
                        </td>
                        <td className="px-6 py-4">
                          <StatusBadge status={r.status} />
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap" style={{ color: "#333333" }}>
                          {r.date}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Mobile cards */}
              <div className="md:hidden divide-y">
                {active.map((r) => (
                  <div
                    key={r.id}
                    className="p-5 space-y-2"
                    style={{ borderTop: "1px solid #E5EAF0" }}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="font-semibold" style={{ color: "#1A1A2E" }}>
                        {r.customer}
                      </div>
                      <StatusBadge status={r.status} />
                    </div>
                    <div className="text-sm" style={{ color: "#333333" }}>
                      {r.location}
                    </div>
                    <div className="text-sm" style={{ color: "#1A1A2E" }}>
                      {r.pkg}
                    </div>
                    <div className="text-xs" style={{ color: "#6B7280" }}>
                      Submitted {r.date}
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </section>

        {/* Completed Requests */}
        <section
          className="rounded-2xl overflow-hidden"
          style={{
            backgroundColor: "#FFFFFF",
            border: "1px solid #E5EAF0",
            boxShadow: "0 4px 24px rgba(22, 105, 169, 0.04), 0 1px 3px rgba(0,0,0,0.04)",
          }}
        >
          <div
            className="px-5 sm:px-6 py-4 border-b flex items-center justify-between"
            style={{ borderColor: "#E5EAF0" }}
          >
            <h2 className="text-lg font-semibold" style={{ color: "#1A1A2E" }}>
            Completed / Denied Requests
            </h2>
            <span className="text-xs font-medium" style={{ color: "#6B7280" }}>
              {completed.length} total
            </span>
          </div>

          {completed.length === 0 ? (
            <div className="px-6 py-8 text-center text-sm" style={{ color: "#6B7280" }}>
              No completed requests yet.
            </div>
          ) : (
            <>
              {/* Desktop table */}
              <div className="hidden md:block overflow-x-auto">
                <table className="w-full text-sm">
                  <thead style={{ backgroundColor: "#F9FAFB" }}>
                    <tr className="text-left" style={{ color: "#6B7280" }}>
                      <th className="px-6 py-3 font-medium">Customer</th>
                      <th className="px-6 py-3 font-medium">Memorial Location</th>
                      <th className="px-6 py-3 font-medium">Package</th>
                      <th className="px-6 py-3 font-medium">Status</th>
                      <th className="px-6 py-3 font-medium">Completed</th>
                    </tr>
                  </thead>
                  <tbody>
                    {completed.map((r) => (
                      <tr key={r.id} className="border-t" style={{ borderColor: "#E5EAF0" }}>
                        <td className="px-6 py-4" style={{ color: "#333333" }}>
                          {r.customer}
                        </td>
                        <td className="px-6 py-4" style={{ color: "#333333" }}>
                          {r.location}
                        </td>
                        <td className="px-6 py-4" style={{ color: "#333333" }}>
                          {r.pkg}
                        </td>
                        <td className="px-6 py-4">
                          <StatusBadge status={r.status} />
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap" style={{ color: "#333333" }}>
                          {r.date}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Mobile cards */}
              <div className="md:hidden">
                {completed.map((r) => (
                  <div
                    key={r.id}
                    className="p-5 space-y-2"
                    style={{ borderTop: "1px solid #E5EAF0" }}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="font-semibold" style={{ color: "#333333" }}>
                        {r.customer}
                      </div>
                      <StatusBadge status={r.status} />
                    </div>
                    <div className="text-sm" style={{ color: "#333333" }}>
                      {r.location}
                    </div>
                    <div className="text-sm" style={{ color: "#333333" }}>
                      {r.pkg}
                    </div>
                    <div className="text-xs" style={{ color: "#6B7280" }}>
                      Completed {r.date}
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </section>
      </main>

      {/* New Request Modal */}
      {showNew && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ backgroundColor: "rgba(26, 26, 46, 0.5)", backdropFilter: "blur(4px)" }}
          onClick={() => setShowNew(false)}
        >
          <div
            className="rounded-2xl w-full max-w-lg flex flex-col"
            style={{
              backgroundColor: "#FFFFFF",
              border: "1px solid #E5EAF0",
              boxShadow: "0 20px 60px rgba(22, 105, 169, 0.2), 0 4px 12px rgba(0,0,0,0.1)",
              maxHeight: "90vh",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Fixed header */}
            <div
              className="px-6 sm:px-8 pt-6 sm:pt-8 pb-4 flex-shrink-0 border-b"
              style={{ borderColor: "#E5EAF0" }}
            >
              <h3 className="text-xl font-semibold" style={{ color: "#1A1A2E" }}>
                New Restoration Request
              </h3>
              <p className="text-sm mt-1" style={{ color: "#6B7280" }}>
                Submit a new memorial restoration request.
              </p>
            </div>

            {/* Scrollable body */}
            <div className="overflow-y-auto flex-1 px-6 sm:px-8">
              <form className="space-y-5 py-6" onSubmit={submitNewRequest}>
                <div>
                  <label
                    className="block text-sm font-medium mb-2"
                    style={{ color: "#374151" }}
                  >
                    Customer Name
                  </label>
                  <input
                    name="customer"
                    required
                    className="w-full h-12 px-4 rounded-lg text-sm transition"
                    style={inputStyle}
                    onFocus={handleInputFocus}
                    onBlur={handleInputBlur}
                  />
                </div>

                <div>
                  <label
                    className="block text-sm font-medium mb-2"
                    style={{ color: "#374151" }}
                  >
                    Customer Phone
                  </label>
                  <input
                    name="phone"
                    type="tel"
                    required
                    placeholder="(000) 000-0000"
                    className="w-full h-12 px-4 rounded-lg text-sm transition"
                    style={inputStyle}
                    onFocus={handleInputFocus}
                    onBlur={handleInputBlur}
                  />
                </div>

                <div>
                  <label
                    className="block text-sm font-medium mb-2"
                    style={{ color: "#374151" }}
                  >
                    Customer Email
                  </label>
                  <input
                    name="email"
                    type="email"
                    required
                    placeholder="customer@example.com"
                    className="w-full h-12 px-4 rounded-lg text-sm transition"
                    style={inputStyle}
                    onFocus={handleInputFocus}
                    onBlur={handleInputBlur}
                  />
                </div>

                <div>
                  <label
                    className="block text-sm font-medium mb-2"
                    style={{ color: "#374151" }}
                  >
                    Memorial Location
                  </label>
                  <input
                    name="location"
                    required
                    placeholder="Anderson Memorial Park — Section, Plot"
                    className="w-full h-12 px-4 rounded-lg text-sm transition"
                    style={inputStyle}
                    onFocus={handleInputFocus}
                    onBlur={handleInputBlur}
                  />
                </div>

                <div>
                  <label
                    className="block text-sm font-medium mb-2"
                    style={{ color: "#374151" }}
                  >
                    Package
                  </label>
                  <select
                    name="pkg"
                    className="w-full h-12 px-4 rounded-lg text-sm transition"
                    style={inputStyle}
                    onFocus={handleInputFocus}
                    onBlur={handleInputBlur}
                  >
                    <option value="basic_annual">Basic Annual $549</option>
                    <option value="premium_annual">Premium Annual $749</option>
                  </select>
                </div>

                <div>
                  <label
                    className="block text-sm font-medium mb-2"
                    style={{ color: "#374151" }}
                  >
                    Notes
                  </label>
                  <textarea
                    name="notes"
                    rows={3}
                    placeholder="Any additional details..."
                    className="w-full px-4 py-3 rounded-lg text-sm transition resize-none"
                    style={inputStyle}
                    onFocus={handleInputFocus}
                    onBlur={handleInputBlur}
                  />
                </div>

                <div>
                  <label
                    className="block text-sm font-medium mb-2"
                    style={{ color: "#374151" }}
                  >
                    Photos{" "}
                    <span className="text-xs font-normal" style={{ color: "#6B7280" }}>
                      (optional · up to 10 · jpg/png/webp · 10 MB each)
                    </span>
                  </label>

                  <input
                    id="photo-upload"
                    type="file"
                    multiple
                    accept="image/jpeg,image/png,image/webp"
                    className="hidden"
                    onChange={(e) => {
                      const incoming = Array.from(e.target.files || []);
                      setSelectedPhotos((prev) => {
                        const existing = prev.map((f) => f.name + f.size);
                        const fresh = incoming.filter(
                          (f) => !existing.includes(f.name + f.size)
                        );
                        return [...prev, ...fresh].slice(0, 10);
                      });
                      e.target.value = "";
                    }}
                  />

                  <button
                    type="button"
                    onClick={() => document.getElementById("photo-upload").click()}
                    className="w-full h-12 rounded-lg text-sm font-medium transition flex items-center justify-center gap-2"
                    style={{
                      backgroundColor: "#F9FAFB",
                      border: "1px dashed #D1D5DB",
                      color: "#6B7280",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = "#1669A9";
                      e.currentTarget.style.color = "#1669A9";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = "#D1D5DB";
                      e.currentTarget.style.color = "#6B7280";
                    }}
                  >
                    <span style={{ color: "#1669A9", fontSize: "18px", lineHeight: 1 }}>
                      +
                    </span>
                    {selectedPhotos.length === 0
                      ? "Choose photos"
                      : `Add more (${selectedPhotos.length}/10)`}
                  </button>

                  {selectedPhotos.length > 0 && (
                    <div className="mt-3 grid grid-cols-3 gap-2">
                      {selectedPhotos.map((file, i) => {
                        const url = URL.createObjectURL(file);
                        return (
                          <div
                            key={i}
                            className="relative group rounded-lg overflow-hidden"
                            style={{
                              aspectRatio: "1",
                              border: "1px solid #E5EAF0",
                            }}
                          >
                            <img
                              src={url}
                              alt={file.name}
                              className="w-full h-full object-cover"
                              onLoad={() => URL.revokeObjectURL(url)}
                            />
                            <button
                              type="button"
                              onClick={() =>
                                setSelectedPhotos((prev) =>
                                  prev.filter((_, idx) => idx !== i)
                                )
                              }
                              className="absolute top-1 right-1 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold transition"
                              style={{
                                backgroundColor: "rgba(255,255,255,0.95)",
                                color: "#DC2626",
                                boxShadow: "0 1px 3px rgba(0,0,0,0.2)",
                              }}
                              onMouseEnter={(e) => {
                                e.currentTarget.style.backgroundColor = "#DC2626";
                                e.currentTarget.style.color = "#FFFFFF";
                              }}
                              onMouseLeave={(e) => {
                                e.currentTarget.style.backgroundColor =
                                  "rgba(255,255,255,0.95)";
                                e.currentTarget.style.color = "#DC2626";
                              }}
                              title="Remove"
                            >
                              ✕
                            </button>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>

                <div className="flex flex-col-reverse sm:flex-row gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowNew(false)}
                    className="flex-1 h-12 rounded-lg text-sm font-semibold transition"
                    style={{
                      backgroundColor: "#FFFFFF",
                      border: "1px solid #D1D5DB",
                      color: "#374151",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = "#F9FAFB";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = "#FFFFFF";
                    }}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="flex-1 h-12 rounded-lg text-sm font-semibold text-white transition disabled:opacity-60"
                    style={{ backgroundColor: "#1669A9" }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.backgroundColor = "#1E90CF")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.backgroundColor = "#1669A9")
                    }
                  >
                    {submitting ? "Submitting…" : "Submit Request"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
      {/* Payment Modal */}
{showPayment && submittedPkg && (
  <div
    className="fixed inset-0 z-50 flex items-center justify-center p-4"
    style={{ backgroundColor: "rgba(26, 26, 46, 0.5)", backdropFilter: "blur(4px)" }}
  >
    <div
      className="rounded-2xl w-full max-w-md"
      style={{
        backgroundColor: "#FFFFFF",
        border: "1px solid #E5EAF0",
        boxShadow: "0 20px 60px rgba(22, 105, 169, 0.2), 0 4px 12px rgba(0,0,0,0.1)",
      }}
    >
      {/* Green success bar */}
      <div
        className="h-1.5 rounded-t-2xl"
        style={{ background: "linear-gradient(90deg, #059669, #10B981)" }}
      />

      <div className="px-8 py-8 text-center">
        {/* Checkmark icon */}
        <div
          className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-5"
          style={{ backgroundColor: "#D1FAE5" }}
        >
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
            <path d="M5 13l4 4L19 7" stroke="#059669" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>

        <h3 className="text-xl font-semibold mb-2" style={{ color: "#1A1A2E" }}>
          Request Submitted!
        </h3>
        <p className="text-sm mb-6" style={{ color: "#6B7280" }}>
          Complete your purchase to activate the restoration service.
        </p>

        {/* Package box */}
        <div
          className="rounded-xl p-5 mb-6 text-left"
          style={{
            backgroundColor: "#F0F7FF",
            border: "1px solid #BFDBFE",
          }}
        >
          <div className="text-xs font-medium mb-1" style={{ color: "#6B7280" }}>
            Selected Package
          </div>
          <div className="text-lg font-semibold" style={{ color: "#1A1A2E" }}>
            {submittedPkg === "basic_annual" ? "Basic Annual" : "Premium Annual"}
          </div>
          <div className="text-2xl font-bold mt-1" style={{ color: "#1669A9" }}>
            {submittedPkg === "basic_annual" ? "$549" : "$749"}
            <span className="text-sm font-normal ml-1" style={{ color: "#6B7280" }}>/year</span>
          </div>
        </div>

        {/* Pay Now button */}
        <a
          href={BILLING_LINKS[submittedPkg]}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 w-full h-12 rounded-lg text-sm font-semibold text-white mb-3 transition"
          style={{ backgroundColor: "#1669A9", textDecoration: "none" }}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#1E90CF")}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#1669A9")}
        >
          Pay Now →
        </a>

        {/* Skip link */}
        <button
          onClick={() => setShowPayment(false)}
          className="w-full text-sm transition"
          style={{ color: "#6B7280" }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "#1669A9")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "#6B7280")}
        >
          I'll pay later
        </button>
      </div>
    </div>
  </div>
)}
    </div>
  );
}