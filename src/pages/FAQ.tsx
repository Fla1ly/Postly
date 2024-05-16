import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Typography from "@mui/material/Typography";
import NavbarContent from "../components/Nav";
import { Stack } from "@mui/material";

export default function FAQ() {
  return (
    <NavbarContent>
      <Typography variant="h4" align="center" sx={{ mt: 5 }}>
        Frequently Asked Questions
      </Typography>
      <Stack >
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1-content"
            id="panel1-header"
          >
            What is Postly?
          </AccordionSummary>
          <AccordionDetails>
            Postly is a blog platform that allows users to read and publish blog
            posts, connecting with a global community of writers. It provides a
            user-friendly experience for both seasoned authors and beginners,
            featuring easy content editing, comment tracking, and social media
            sharing options.
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2-content"
            id="panel2-header"
          >
            How do I create an account on Postly?
          </AccordionSummary>
          <AccordionDetails>
            To create an account, click on the "Sign Up" button on the homepage,
            fill in the required details, and follow the instructions to verify
            your email address.
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2-content"
            id="panel2-header"
          >
            How do I publish a blog post?
          </AccordionSummary>
          <AccordionDetails>
            Once you're logged in, click on the "Create Post" button. You can
            then write your blog post using our editor, add images or other
            media, and click "Publish" when you're ready to share it with the
            world.
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2-content"
            id="panel2-header"
          >
            Can I edit my blog post after publishing it?
          </AccordionSummary>
          <AccordionDetails>
            Yes, you can edit your blog post at any time. Go to your profile,
            select the post you want to edit, make the necessary changes, and
            save your updates.
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel5-content"
            id="panel5-header"
          >
            How can I follow other writers on Postly?
          </AccordionSummary>
          <AccordionDetails>
            To follow other writers, visit their profile page and click on the
            "Follow" button. You'll then receive updates whenever they publish
            new content.
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel6-content"
            id="panel6-header"
          >
            What should I do if I encounter inappropriate content?
          </AccordionSummary>
          <AccordionDetails>
            If you come across any content that violates our community
            guidelines, you can report it by clicking on the "Report" button
            next to the post or comment. Our moderation team will review the
            report and take appropriate action.
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel7-content"
            id="panel7-header"
          >
            How do I comment on a blog post?
          </AccordionSummary>
          <AccordionDetails>
            To comment on a blog post, scroll down to the comments section at
            the bottom of the post, type your comment in the provided field, and
            click "Submit."
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1-content"
            id="panel1-header"
          >
            Can I share blog posts on social media?
          </AccordionSummary>
          <AccordionDetails>
            Yes, you can share blog posts on social media by clicking on the
            social media icons (e.g., Facebook, Twitter) located at the top or
            bottom of each post.
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1-content"
            id="panel1-header"
          >
            How do I delete my account?
          </AccordionSummary>
          <AccordionDetails>
            If you wish to delete your account, go to your account settings,
            scroll down to the "Delete Account" section, and follow the
            instructions. Please note that this action is irreversible, and all
            your data will be permanently deleted.
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1-content"
            id="panel1-header"
          >
            What measures does Postly take to ensure user privacy?
          </AccordionSummary>
          <AccordionDetails>
            Postly complies with GDPR and other privacy regulations to protect
            user data. We ask for your consent before collecting personal
            information and ensure that all data is stored securely. For more
            details, please refer to our Privacy Policy.
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1-content"
            id="panel1-header"
          >
            Can I use Postly for free?
          </AccordionSummary>
          <AccordionDetails>
            Yes, Postly offers a free plan with essential features. We also have
            premium plans with additional features for those who want an
            enhanced experience.
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1-content"
            id="panel1-header"
          >
            How can I contact customer support?
          </AccordionSummary>
          <AccordionDetails>
            If you need assistance, you can contact our customer support team by
            clicking on the "Contact Us" link at the bottom of the page and
            filling out the support form. We'll get back to you as soon as
            possible.
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1-content"
            id="panel1-header"
          >
            What types of content are prohibited on Postly?
          </AccordionSummary>
          <AccordionDetails>
            Content that is illegal, harmful, threatening, abusive, harassing,
            defamatory, vulgar, obscene, or otherwise objectionable is
            prohibited on Postly. For more details, please refer to our
            Community Guidelines.
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1-content"
            id="panel1-header"
          >
            Can I customize the appearance of my blog?
          </AccordionSummary>
          <AccordionDetails>
            Yes, Postly allows you to customize the appearance of your blog. Go
            to your profile settings, where you can choose different themes,
            fonts, and layouts to personalize your blog.
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1-content"
            id="panel1-header"
          >
            How do I reset my password?
          </AccordionSummary>
          <AccordionDetails>
            If you've forgotten your password, click on the "Forgot Password"
            link on the login page. Enter your registered email address, and
            we'll send you instructions on how to reset your password.
          </AccordionDetails>
        </Accordion>
      </Stack>
    </NavbarContent>
  );
}
