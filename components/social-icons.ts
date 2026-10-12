import {
  IconBrandGithub,
  IconBrandLinkedin,
  type Icon,
} from "@tabler/icons-react";
import type { SocialId } from "@/content/site";

export const socialIcons: Record<SocialId, Icon> = {
  linkedin: IconBrandLinkedin,
  github: IconBrandGithub,
};
