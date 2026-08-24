// REFERENCE ONLY — pulled directly from Figma via get_design_context.
// Do not use verbatim: convert to the project's component patterns
// (dynamic nav from a config, React Router Link instead of <p>, etc.)
// Design tokens: see DESIGN_TOKENS.md

export default function Navbar() {
  return (
    <div className="bg-white content-stretch flex items-center justify-between px-[80px] relative size-full" data-node-id="11:5" data-name="navbar">
      <div className="content-stretch flex gap-[8px] items-center relative shrink-0" data-node-id="11:6" data-name="logo">
        <div className="bg-gradient-to-r content-stretch flex from-[#06b6d4] items-center justify-center relative rounded-[6px] shrink-0 size-[32px] to-[#a855f7]" data-node-id="11:7" data-name="Frame">
          <p className="font-['Manrope:ExtraBold'] font-extrabold leading-[normal] relative shrink-0 text-[16px] text-white whitespace-nowrap" data-node-id="11:8">T</p>
        </div>
        <p className="font-['Manrope:ExtraBold'] font-extrabold leading-[normal] relative shrink-0 text-[#0f172a] text-[20px] whitespace-nowrap" data-node-id="11:9">TECHIVE</p>
      </div>
      <div className="content-stretch flex font-['Inter:Medium'] font-medium gap-[24px] items-start leading-[normal] not-italic relative shrink-0 text-[14px] whitespace-nowrap" data-node-id="11:10" data-name="menu">
        <p className="relative shrink-0 text-[#06b6d4]" data-node-id="11:11">Home</p>
        <p className="relative shrink-0 text-[#475569]" data-node-id="11:12">Services</p>
        <p className="relative shrink-0 text-[#475569]" data-node-id="11:13">Solutions</p>
        <p className="relative shrink-0 text-[#475569]" data-node-id="11:14">Academy</p>
        <p className="relative shrink-0 text-[#475569]" data-node-id="11:15">Portfolio</p>
        <p className="relative shrink-0 text-[#475569]" data-node-id="11:16">About Us</p>
        <p className="relative shrink-0 text-[#475569]" data-node-id="11:17">Blog</p>
        <p className="relative shrink-0 text-[#475569]" data-node-id="11:18">Contact</p>
      </div>
      <div className="content-stretch flex gap-[12px] items-center relative shrink-0" data-node-id="11:19" data-name="actions">
        <div className="bg-white border border-[#e2e8f0] border-solid content-stretch flex items-center justify-center px-[25px] py-[13px] relative rounded-[8px] shrink-0" data-node-id="11:20" data-name="btn-secondary">
          <p className="font-['Inter:Semi_Bold'] font-semibold leading-[normal] not-italic relative shrink-0 text-[#0f172a] text-[14px] whitespace-nowrap" data-node-id="11:21">Book a Consultation</p>
        </div>
        <div className="bg-gradient-to-r content-stretch flex from-[#06b6d4] items-center justify-center px-[26px] py-[14px] relative rounded-[8px] shrink-0 to-[#a855f7]" data-node-id="11:22" data-name="btn-primary">
          <p className="font-['Inter:Semi_Bold'] font-semibold leading-[normal] not-italic relative shrink-0 text-[14px] text-white whitespace-nowrap" data-node-id="11:23">Get a Quote</p>
        </div>
      </div>
    </div>
  );
}
