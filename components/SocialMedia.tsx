import React, { ReactNode } from 'react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip';
import { Facebook, Github, Linkedin, Slack, Youtube } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
interface Props{
  className?:string;
  iconClassName?:string;
  tooltipClassName?:string;
}


const socialLink = [
  {title:"Facebook",
    href:"https://www.facebook.com",
    icon:<Facebook className="w-5 h-5"/>
  },
  {title:"Github",
    href:"https://www.github.com",
    icon:<Github className="w-5 h-5"/>
  },
  {title:"Youtube",
    href:"https://www.youtube.com",
    icon:<Youtube className="w-5 h-5"/>
  },
  {title:"Slack",
    href:"https://www.slack.com",
    icon:<Slack className="w-5 h-5"/>
  },
  {title:"Linkedin",
    href:"https://www.linkedin.com",
    icon:<Linkedin className="w-5 h-5"/>
  }
]

const SocialMedia = ({className,iconClassName,tooltipClassName}:Props) => {
  return (
    <TooltipProvider>
      <div className={cn('flex items-center gap-3.5',className)}>
        {
          socialLink?.map((items,index)=>(
        <Tooltip key={items?.title}>
          <TooltipTrigger asChild>
            <Link href={items?.href} 
             target='_blank'
            rel='noopener noreferrer'
            className={cn('p-2 border rounded-full hover:text-white hover:border-white hoverEffect',iconClassName)}>
            {items?.icon}
            </Link>
          </TooltipTrigger>
          <TooltipContent className={cn('bg-white text-darkColor font-semibold',tooltipClassName)}>{items?.title}</TooltipContent>
        </Tooltip>
          ))
        }
      </div>
    </TooltipProvider>
  );
}

export default SocialMedia;
