import { motion, useReducedMotion } from 'framer-motion';

import { HOME_EASE } from '../constants';

type CommunityMember = {
  nickname: string;
  role: string;
  statement: string;
  avatar: string;
  href: string;
};

const COMMUNITY_MEMBERS: CommunityMember[] = [
  {
    nickname: 'weifuwan',
    role: 'Maintainer',
    statement: 'Building Yak Ops in the open, one data workflow at a time.',
    avatar: 'https://avatars.githubusercontent.com/u/78582861?v=4',
    href: 'https://github.com/weifuwan',
  },
  {
    nickname: 'gitfortian',
    role: 'Community contributor',
    statement: 'Bringing real workflow, sync, and product scenarios into the roadmap.',
    avatar: 'https://avatars.githubusercontent.com/u/52306466?v=4',
    href: 'https://github.com/gitfortian',
  },
  {
    nickname: 'titainic',
    role: 'Community contributor',
    statement: 'Pushing Yak Ops toward stronger Hive support across connection, SQL, and lineage.',
    avatar: 'https://avatars.githubusercontent.com/u/10671288?v=4',
    href: 'https://github.com/titainic',
  },
];

function CommunityCard({ member, duplicate = false }: { member: CommunityMember; duplicate?: boolean }) {
  return (
    <a
      href={member.href}
      target="_blank"
      rel="noreferrer"
      tabIndex={duplicate ? -1 : undefined}
      aria-hidden={duplicate ? true : undefined}
      className="group flex h-[230px] w-[clamp(18rem,16.285714rem+8.571429vw,24rem)] shrink-0 flex-col justify-between rounded-[clamp(1.25rem,1.107143rem+0.714286vw,1.75rem)] border border-solid border-[#DDD9CF] bg-[#FAF9F5] p-[clamp(1.5rem,1.285714rem+1.071429vw,2.25rem)] text-[#181817] no-underline transition-colors duration-300 hover:border-[#C8C3B8] hover:bg-white"
    >
      <p className="m-0 max-w-[25ch] text-[clamp(1.18rem,1.08rem+0.5vw,1.45rem)] group-hover:text-[#C96442] font-medium leading-[1.35] tracking-[-0.01em] [font-family:'Yak_Serif',Georgia,sans-serif]">
        {member.statement}
      </p>

      <div className="flex items-center gap-3">
        <img src={member.avatar} alt="" loading="lazy" className="h-11 w-11 shrink-0 rounded-full object-cover" />

        <div className="min-w-0 [font-family:'Yak_Sans',Arial,sans-serif]">
          <div className="flex items-center gap-2">
            <span className="truncate text-[14px] font-medium text-[#353431]">{member.nickname}</span>
            <span
              aria-hidden="true"
              className="text-[12px] text-[#8A877F] transition-transform duration-300 group-hover:translate-x-0.5"
            >
              ↗
            </span>
          </div>
          <p className="mb-0 mt-0.5 text-[12px] leading-5 text-[#77746D]">{member.role}</p>
        </div>
      </div>
    </a>
  );
}

export default function HomeCommunitySection() {
  const shouldReduceMotion = useReducedMotion() ?? false;

  return (
    <section className="relative border-t border-solid border-[#E3E0D7] bg-[#F7F5EE]">
      <div className="mx-auto w-[calc(100%-clamp(2rem,1.428571rem+2.857143vw,4rem)*2)] max-w-[90rem] py-[clamp(7rem,6.142857rem+4.285714vw,10rem)]">
        <motion.div
          initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: Boolean(shouldReduceMotion), amount: 0.45 }}
          transition={{
            duration: shouldReduceMotion ? 0.2 : 0.7,
            ease: HOME_EASE,
          }}
          className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:gap-8"
        >
          <h2 className="m-0 max-w-[12ch] text-[clamp(2.5rem,2.035714rem+2.321429vw,4.125rem)] font-medium leading-[1.04]  text-[#181817] lg:col-span-5 [font-family:'Yak_Serif',Georgia,sans-serif]">
            Built with the community
          </h2>

          <div className="max-w-[34rem] lg:col-span-5 lg:col-start-8 lg:pt-2">
            <p className="m-0 text-[clamp(1rem,0.964286rem+0.178571vw,1.125rem)] leading-[1.65] text-[#66645F] [font-family:'Yak_Sans',Arial,sans-serif]">
              Yak Ops grows through the people who use it, test it, report real problems, and help shape what comes
              next.
            </p>

            <a
              href="https://github.com/weifuwan/yak-ops/issues"
              target="_blank"
              rel="noreferrer"
              className="mt-5 inline-flex items-center gap-2 text-[14px] font-medium text-[#353431] no-underline transition-colors duration-200 hover:text-[#C96442] [font-family:'Yak_Sans',Arial,sans-serif]"
            >
              Join the conversation
              <span aria-hidden="true">↗</span>
            </a>
          </div>
        </motion.div>

        <div
          className="mt-[clamp(4.5rem,4.071429rem+2.142857vw,6rem)] overflow-hidden"
          style={{
            WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 5%, black 95%, transparent 100%)',
            maskImage: 'linear-gradient(to right, transparent 0%, black 5%, black 95%, transparent 100%)',
          }}
        >
          <motion.div
            className="flex w-max gap-5 py-1"
            animate={
              shouldReduceMotion
                ? undefined
                : {
                    x: ['0%', '-50%'],
                  }
            }
            transition={
              shouldReduceMotion
                ? undefined
                : {
                    duration: 24,
                    ease: 'linear',
                    repeat: Number.POSITIVE_INFINITY,
                  }
            }
          >
            {COMMUNITY_MEMBERS.map((member) => (
              <CommunityCard key={`community-a-${member.nickname}`} member={member} />
            ))}

            {!shouldReduceMotion &&
              COMMUNITY_MEMBERS.map((member) => (
                <CommunityCard key={`community-b-${member.nickname}`} member={member} duplicate />
              ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
