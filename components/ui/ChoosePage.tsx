import {
  Stack,
} from "@chakra-ui/react";
import WebsiteCard from "./WebsiteCard";

export default function ChoosePage() {
  return (
    <Stack
      direction={["column", "row", "row", "row", "row"]}
      justifyContent="flex-start"
      alignItems="flex-start"
      maxWidth="full"
      px="2px"
      spacing={["10px", '5px', "20px", "35px", "50px"]}
    >
      <WebsiteCard
        name="Vendor Portal"
        image1="https://peninsulachronicle.com/wp-content/uploads/2021/04/W3A0365-2-scaled.jpg"
        image2="https://virginiacraftbeer.com/wp-content/uploads/2021/06/Drink-Bold-Mariner-980x654.jpg"
        url1="https://coastalfermentory.com/"
        url2="https://theboldmariner.com/"
        route="./vendor/"
      />
      <WebsiteCard
        name="Customer Portal"
        image1="https://www.fsrmagazine.com/sites/default/files/styles/story_image_720x430/public/2022-03/Customers-drinking-beer-outside.jpg?itok=pXFfAeQQ"
        image2="https://miro.medium.com/max/1400/0*n3eQIPCYM5UA50Yo.jpg"
        url1="https://coastalfermentory.com/"
        url2="https://theboldmariner.com/"
        route="./customer/"
      />
    </Stack>
  );
}
