"use client";
import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sparkles,
  Copy,
  Calendar,
  FileText,
  PenTool,
  BarChart,
} from "lucide-react";
import apiClient from "@/lib/api";
import dynamic from "next/dynamic";
import BlogHeadingPopup from "@/components/BlogHeadingPopup";
import ContentPublisher from "@/components/ContentPublisher";

// Dynamically import TiptapEditor to avoid SSR issues
const TiptapEditor = dynamic(() => import("@/components/TiptapEditor"), {
  ssr: false,
  loading: () => <p>Loading Editor...</p>,
});

export default function BlogGenerator() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedContent, setGeneratedContent] = useState("");
  const [editorContent, setEditorContent] = useState("");
  const [apiError, setApiError] = useState(null);
  const [showHeadingPopup, setShowHeadingPopup] = useState(true);
  const [blogHeadings, setBlogHeadings] = useState([
    {
      title: 'Introduction to the Timeless Beauty of Nature',
      images: [
        'https://cdn.pixabay.com/photo/2017/09/29/23/49/fall-2800880_150.jpg',
        'https://cdn.pixabay.com/photo/2017/12/17/19/08/bridge-3024773_150.jpg',
        'https://cdn.pixabay.com/photo/2017/10/28/18/17/trees-2897757_150.jpg',
        'https://cdn.pixabay.com/photo/2021/11/22/16/46/nature-6816877_150.jpg',
        'https://cdn.pixabay.com/photo/2020/08/18/15/15/forest-5498483_150.jpg',
        'https://cdn.pixabay.com/photo/2019/08/20/10/14/moss-4418351_150.jpg',
        'https://cdn.pixabay.com/photo/2013/07/25/01/31/forest-166733_150.jpg',
        'https://cdn.pixabay.com/photo/2022/10/31/12/43/mountain-7559738_150.jpg',
        'https://cdn.pixabay.com/photo/2022/01/17/11/16/alpine-6944487_150.jpg',
        'https://cdn.pixabay.com/photo/2023/11/08/20/11/mountains-8375693_150.jpg',
        'https://cdn.pixabay.com/photo/2020/04/15/04/11/lake-5045059_150.jpg',
        'https://cdn.pixabay.com/photo/2020/04/22/12/05/adventure-5077752_150.jpg',
        'https://cdn.pixabay.com/photo/2014/01/04/13/51/lake-238515_150.jpg',
        'https://cdn.pixabay.com/photo/2020/09/28/23/01/mountains-5611269_150.jpg',
        'https://cdn.pixabay.com/photo/2021/04/01/20/49/trees-6143244_150.jpg'
      ],
      downLoadImageLink: [
        'https://pixabay.com/get/g8e6025ada0cd53a57d91bd6f5f3275c53cf1160ef4455f48886cb6fe3d9592c491d8678aeeb4b24573500554119eb7706b729b643e5f2b27ee4fb6a6974b2da0_640.jpg',
        'https://pixabay.com/get/g4e9a95ca64db21256b845fe8e097ebfee1cca368d02bc4205b17f0d82e53908a3f6f80faacd6cace951adfa38a1323b3b4bb63e68bd62e8e75fc14fccfdbb5ce_640.jpg',
        'https://pixabay.com/get/gac2da40d06067ec99a8bac7d90e66cb44a5d694d64f923700fb108bc111f5abc877e2a349413c9e76362480c410668f0bc1fa73068fd2e9b4beb5ab62f46a0ae_640.jpg',
        'https://pixabay.com/get/ge3db13f066cc9279252ada7b8dfcb98473f39f5b512168883dbbeece8c02197d85c0384f7fd339800e642b4ebf1f43e09022175e101f41d8d8a8bfdcfd6b661b_640.jpg',
        'https://pixabay.com/get/gf66ac494dce1c0ab738364c79db51faa66e1e9fe3c750538f3aa3a6b9cc5844677fb59f370a26fb194455b9f1ed66a1b325b6aeaebc28d81569896c09a410f4d_640.jpg',
        'https://pixabay.com/get/gc28f2134e41bbc1b89b62894ecc598b0dcab36394bc83de57e89b4ffaa8e8184b37f640d00eeccf377a603f364a7acd8fe00e23a58a5096fdd3de86b270af2fc_640.jpg',
        'https://pixabay.com/get/g895138a38823fcd70ec8c40bf35efd57e8601922d7f3f18f342ed660bb98550e17f9c5f0b9dc6bfc62caf6a22e2a9052_640.jpg',
        'https://pixabay.com/get/gcd7d935790e59c815ac740c1301c6b7698a4915e65c55c953084b95bee99561c4b93ee2978f44c078ae2794c9d867ed988e34dc792c81ea3139514c51fd8068d_640.jpg',
        'https://pixabay.com/get/g433b84e156affd63385ff51fc8bb722e18e1925d0611b43937baaf14e3ff90672d698d6a96c457496b1fb1e05ca113239b316d869652547a69b8d2c21847b172_640.jpg',
        'https://pixabay.com/get/ge1ad6bd8c83e4e3a02d01ddb247991f6d3e7ca09eba69ba9ea2f3767cf8fb19184bb2c71ee33bce2cf456373bb4dc1142ebeec07abb2eb389c91a39d8a6e0f61_640.jpg',
        'https://pixabay.com/get/gd19825f08608794c146e33bf9a88181cf4ae6138bf267faaed7ee5214c0d811b8b6ce7493250c3bbc50be66899e2848d287dd43c6e8b561951dc74dda9bd0a53_640.jpg',
        'https://pixabay.com/get/g2d807601ff0f07ed976bf9b0d6a58e66cc41b75999d7daadd12c174c1f32d473baffbc2eee0e408262b27ee63ca2a6286276a6cf94611c95dbbd7ae25bd28f71_640.jpg',
        'https://pixabay.com/get/gbca418fbc23f520f485bc41765dad381831ba22fa472bdfb4023b670f50d26aca2963d133590ecbe7a94a54dd2d61f66_640.jpg',
        'https://pixabay.com/get/g80aab351d86a345cf69feb9dedb98aab98b7d71d18a5ffa50ac48d4f5eea4da3e67ce9ba88da972dde1c335f01b85c42e510e51437ffaf72244a315056364528_640.jpg',
        'https://pixabay.com/get/g4d2cfcd29af13467059172fec551fd74ee9b6c19581a7647d4a23ca3d415db3da3aae45bd4db9d9d3bfd72cfd3fe659865c1ec21b483f21dedce2ceb2c48fafd_640.jpg'
      ]
    },
    {
      title: 'Exploring the Diverse Wonders of Nature',
      images: [
        'https://cdn.pixabay.com/photo/2023/04/15/14/21/bird-7927829_150.jpg',
        'https://cdn.pixabay.com/photo/2023/06/17/20/15/lake-8070741_150.png',
        'https://cdn.pixabay.com/photo/2023/08/29/18/36/deer-roe-8221953_150.jpg',
        'https://cdn.pixabay.com/photo/2019/11/20/20/42/goose-4641090_150.jpg',
        'https://cdn.pixabay.com/photo/2020/03/10/13/53/flamingos-4919079_150.jpg',
        'https://cdn.pixabay.com/photo/2013/08/17/04/21/bee-173322_150.jpg',
        'https://cdn.pixabay.com/photo/2019/08/27/22/23/mountains-4435423_150.jpg',
        'https://cdn.pixabay.com/photo/2025/07/05/13/27/falcon-9697872_150.jpg',
        'https://cdn.pixabay.com/photo/2017/02/17/23/15/duiker-island-2076042_150.jpg',
        'https://cdn.pixabay.com/photo/2023/11/09/13/21/swallowtail-butterfly-8377375_150.jpg',
        'https://cdn.pixabay.com/photo/2022/10/04/16/00/butterfly-7498583_150.jpg',
        'https://cdn.pixabay.com/photo/2023/04/09/20/04/flower-7912164_150.jpg',
        'https://cdn.pixabay.com/photo/2017/07/14/17/44/frog-2504507_150.jpg',
        'https://cdn.pixabay.com/photo/2023/01/29/19/31/mazarine-blue-7753988_150.jpg',
        'https://cdn.pixabay.com/photo/2023/10/12/14/46/frog-8310960_150.jpg'
      ],
      downLoadImageLink: [
        'https://pixabay.com/get/g4b5468870a1976ce11caa4e0418aa58164bead6de5b66a7fca90ad34dfa0436ab93f7cbdce6d6ccbc7e5c5daf2d04d7aaaa7daf61e35ca4f6658334e8e479942_640.jpg',
        'https://pixabay.com/get/gce11d75e0e4e17a8f1032b1c73e4b7f68d0088429608a040f908bdfb582ca8a97cc5c87a7b1d5972be9d904ff6546aef54a820855991a66a118e6a4c8dce21b8_640.png',
        'https://pixabay.com/get/g14dd2668cad6c91a063a145202e4c478e2f42813cc3b3e582f2c7cdffcc20f3451794c6f5524d688dabac74f3e95ce1ef6a6b3df3c9a211ff07c497ef2d5e2fd_640.jpg',
        'https://pixabay.com/get/g36f3a74babbc819abdb114654f725c8ff97e4667c3a08495d6b06fe7ee138794279749ecde8d13bc5c655fee849619653bee8122e49ac980981329013212f97a_640.jpg',
        'https://pixabay.com/get/g869d9caa9b3e7857e3abbc7ef8585b021b78fd3991bfdfc63e76950f2647ac9d220a7e4b29299d009c52a8fa51371cf9b29b6c9220a33020994b39d9524306ff_640.jpg',
        'https://pixabay.com/get/gf0b97fefefa5689390c750923132ea437df8753853a58ab6543d36f8ac79791d68d46da6e23fde7a21cd09467d22fcb8_640.jpg',
        'https://pixabay.com/get/g3b4f90132e6804bd948dc949e19fabe617e33510925ac6df1c8edafa6d01fba31865a8e8d9cc883e3c653aecc5711206e06020b69f8c631a2c42eef4a0a70f6e_640.jpg',
        'https://pixabay.com/get/g26e85979191c2c7fc2f9e91e8a79f6fbcb48d7dcc7a099358803f8f9d92c278000d2d8a0d90de4612cb9e7a559558db13c296d186d7f113e386bf8ae2038827e_640.jpg',
        'https://pixabay.com/get/gbf7f896179f6a93482fbd2a433b30a6b3710e2eba479225563c9886ec7b5fc6927aaee406967df239cb8288b01eac62a7f6394b0648e89e54339db9de8c40d06_640.jpg',
        'https://pixabay.com/get/g97d07b40e7490635dd0c887f92003ebb7c82c1e7df708729aa98997c2cd30210de42ecbd122fa2cc54ce1da5fed07b1f8977de1f71db14662282070b1a4cb6d1_640.jpg',
        'https://pixabay.com/get/g335d3c475ecaf69ff21b6db3190895d4ac7072c00548e9ff086cb7ac492ee93740b22d3b3248b0df6509ce0b37d51baa5f9ef00cb2659f831314a171e5988326_640.jpg',
        'https://pixabay.com/get/g1d98515e5946e66f3badabd4aea4b9daeede02ea887c04d8f0b14fd4fbf8b150565257473dd3cb93440d00796be10a08807a962ba13e134e84330b05f75595fa_640.jpg',
        'https://pixabay.com/get/g6061335e17d3125330bfac7f44bc0937c71971f869b055a00ccaab8f1dea3ab1a364e38a074e74b1cf7acabf57e7376779cfcfa0969d1da2180a3fd90bc00c14_640.jpg',
        'https://pixabay.com/get/g2c15d07fa6286b2e58d1e78d42edfb603a97832749b7140905decba8f3de88a4c03a5d3e9fb822618de8c401e5d47beb1fa22a933b332138485e59f0844b061e_640.jpg',
        'https://pixabay.com/get/g77346da62e8c8815219927cf0a25dd9d7919c2d9201590dfcc0a45a673a3e05b92ad89eb35e0abe93e457cf5a5f6ed3fdb9fc17663cf61884c6136bd9011df9e_640.jpg'
      ]
    },
    {
      title: 'Why Protecting Nature Matters Today',
      images: [
        'https://cdn.pixabay.com/photo/2023/01/09/22/05/gorilla-7708352_150.jpg',
        'https://cdn.pixabay.com/photo/2023/02/10/13/44/gorilla-7780902_150.jpg',
        'https://cdn.pixabay.com/photo/2023/09/08/05/28/gibbon-8240408_150.png',
        'https://cdn.pixabay.com/photo/2019/09/04/09/48/animal-4451152_150.jpg',
        'https://cdn.pixabay.com/photo/2013/07/19/00/18/tiger-165189_150.jpg',
        'https://cdn.pixabay.com/photo/2023/08/05/15/42/panda-8171354_150.jpg',
        'https://cdn.pixabay.com/photo/2023/02/18/13/48/barbary-macaque-7797970_150.jpg',
        'https://cdn.pixabay.com/photo/2018/11/23/16/51/zebra-3834241_150.jpg',
        'https://cdn.pixabay.com/photo/2025/04/25/12/26/rhinoceros-9558888_150.jpg',
        'https://cdn.pixabay.com/photo/2017/01/12/21/42/tiger-1975790_150.jpg',
        'https://cdn.pixabay.com/photo/2022/01/28/23/01/elephant-6976003_150.jpg',
        'https://cdn.pixabay.com/photo/2012/03/04/00/08/safari-21772_150.jpg',
        'https://cdn.pixabay.com/photo/2014/09/16/20/52/gorilla-448731_150.jpg',
        'https://cdn.pixabay.com/photo/2019/09/08/19/54/panda-4461766_150.jpg',
        'https://cdn.pixabay.com/photo/2024/04/18/09/44/polar-bear-8703907_150.jpg'
      ],
      downLoadImageLink: [
        'https://pixabay.com/get/g8ca7767df107796631b87cff16f5fa638784bcbed031c51f41337abb6ade2340764613059172068201accf479d11bc04cc295649ee97a7cbcc101cbc9f2d3433_640.jpg',
        'https://pixabay.com/get/g7cbccfdee6b5d910fe300929c11ad0569bf1a8a03327f68401bbe141b0915f0f8d423dfcdceb465d48cbedeab003706f713a0f9d532446db679f0b28d5b5688c_640.jpg',
        'https://pixabay.com/get/gacd621656d35c4eba5393665e722477b1884a673d31a5089a9bbffbf6eaa0d26aba0eb27751c9e9c26db4753d1a92ae5c01bf2d3740aa3f8bae8b8d7008ceeee_640.png',
        'https://pixabay.com/get/g0803676b1c1435ce9204f51f523d62b7f5c07149b0ecfe34b52ecf17c0b30aaeaae7e16395eace69a0cc56c5f4b5d61ae83f0ec941258ab9445d5af9fb2ba80c_640.jpg',
        'https://pixabay.com/get/ga4d9ce806ffdfcc344d4e65a6ff51d84aef623b8636cee138b266cc2a023f1f6868db6b0bded17b02f2fd2c4e6630d2a_640.jpg',
        'https://pixabay.com/get/g55ee4a41c7768d3eec60d67b6a8eb995156bbcffdab7fce373ea6101cd9dea87e102e17d399af8fa048cb2fe145636719980d5492a644e325583e5ec3b3090f0_640.jpg',
        'https://pixabay.com/get/g4afcb5928307dec6a85f0760448babc50df2b57e83012cd0e989ccdc036156d296076c6c8e0ec46012c6de74bf7aa2a525d5a1268476c3fb011e019b7a7d6237_640.jpg',
        'https://pixabay.com/get/gf8c81d3739d1ffdaf3c1c6a35e8c0fa5dba885ff84e2cd82889097f06513f8b67849802e10e71826f5ef0778b77f4d677182dee0eba137e7516c1b956b4729b1_640.jpg',
        'https://pixabay.com/get/g5ca73ffae824f12beb048d93f4cf19de639db1ddc6920f91b132f4b5a9d421957d1c7f1e6cad513611c93eb1b9f818ab1db380de177834b1a8abb0f80c673625_640.jpg',
        'https://pixabay.com/get/gc4cbf540611dd4d4d9bc5528aace048aa2c19e1963abbabb8cc4b646b0574aed56b9c16f344e0ccf69fe36ce47bfbb185c2d546ae14de96bb628e48b8da7eb14_640.jpg',
        'https://pixabay.com/get/g7c345fed7dac4b1c01e6e1bb4e6758d6b2f8e322147e3edaaed024f50de5d50e634b99b5a0fe671247ce7a70449b2d39720b04458dab05479e5ae99d3783044a_640.jpg',
        'https://pixabay.com/get/g1e68e21f806cc8b209237d9ec2d1eae2dd590f9f4d833df90ae76b1382c0cdcb417644684371ac863ed4229f1cfe2328_640.jpg',
        'https://pixabay.com/get/gba365cc35ec946adebf48c85e8d1053d589deb405cd981a081e1177801e8e7d7433cdc367b9d92a3c5bab16014955856_640.jpg',
        'https://pixabay.com/get/gfdf19a8857b7f0c50b5c5fd1eccc800501ed3c88fdc1773ba06d9a6772122fc6ea5b4f254e19e1abc8348a5c3da789b25e170ba01371c53bb513f50dd6df0961_640.jpg',
        'https://pixabay.com/get/g946833c7344ecdbb43b3cd5baeefe580fddcdb501411347aa40ee57e9ec92361620278b0087cd8479c5587eaa410253e41444b028bdd0a2e0c2d3b289b10ed7a_640.jpg'
      ]
    },
    {
      title: 'Bringing the Essence of Nature into Your Life',
      images: [
        'https://cdn.pixabay.com/photo/2023/04/16/09/49/waterfall-7929685_150.jpg',
        'https://cdn.pixabay.com/photo/2023/06/04/11/42/river-8039447_150.jpg',
        'https://cdn.pixabay.com/photo/2019/11/23/03/08/valley-4646114_150.jpg',
        'https://cdn.pixabay.com/photo/2021/03/23/17/21/mountains-6118182_150.jpg',
        'https://cdn.pixabay.com/photo/2020/11/08/00/17/waterfall-5722620_150.jpg',
        'https://cdn.pixabay.com/photo/2022/01/23/20/50/woman-6961929_150.jpg',
        'https://cdn.pixabay.com/photo/2019/07/02/17/52/mountains-4312789_150.jpg',
        'https://cdn.pixabay.com/photo/2013/11/28/10/03/river-219972_150.jpg',
        'https://cdn.pixabay.com/photo/2013/06/10/00/30/river-123926_150.jpg',
        'https://cdn.pixabay.com/photo/2017/10/05/09/56/ladakh-2818861_150.jpg',
        'https://cdn.pixabay.com/photo/2016/02/22/21/07/snow-1216543_150.jpg',
        'https://cdn.pixabay.com/photo/2019/07/10/18/08/woman-4329183_150.jpg',
        'https://cdn.pixabay.com/photo/2023/07/15/10/48/alps-8128537_150.jpg',
        'https://cdn.pixabay.com/photo/2018/04/16/16/16/sunset-3325080_150.jpg',
        'https://cdn.pixabay.com/photo/2016/11/29/11/16/man-1869135_150.jpg'
      ],
      downLoadImageLink: [
        'https://pixabay.com/get/g57ba5eec75eeb0d19dbb2a007179e5617f052f531e6fd8a84e8af7bf574890a0d8eb84028b30b4f8cf54963dfc3efb7e4ba5cbcabc5c3e8ba99106cf90a4d24d_640.jpg',
        'https://pixabay.com/get/g02103683213bf90294f0c6878a56289f559f3b7719dd60d7b9ef5543c3df848aaf480bbc3a1e5091a77ce72280213c3e1389b4b978c38e66c4a3d8b136ee76ee_640.jpg',
        'https://pixabay.com/get/gf4e7ea0b7fd94e3f1ba00566ed9f1aa824f5ef3cf5886a996d4d0b103ab4d6f6aa35fc33051a59fd6f08ee181c9aea43545b0e17d5837ea01a031da833311e1a_640.jpg',
        'https://pixabay.com/get/g2304758391c825783814c850186490ad28ad5c21cfb21d1b8e33c60079aee91e51807f2243dfcbc7de08c9b3d78ad86bd0641ad9903f050d09b4d114210f6459_640.jpg',
        'https://pixabay.com/get/ge0b0d2124e85912ccdc3642d4d6412c36e88cec8d6e9283dd64ad841e794a15cd73fbe78d551b34f08bb56286b348d54b389790e388539454f4420b51fa5b777_640.jpg',
        'https://pixabay.com/get/g1f4c512df54cc8fddcded61b2fc27125e27e5fcae7e7321ec9dec15712ad9e5f754b4d8611715a09cd72c6965555e1636c52241e7376a803f097222ba7c0d387_640.jpg',
        'https://pixabay.com/get/g6a3a9c5619b8537aa072ddac22ccb7a4759edb6025a5e4d465c65bcaaf54286a669e19330f3f4aefe1ee910067365b102dabe7ad15cceec930c0b321ee6852b6_640.jpg',
        'https://pixabay.com/get/gc41f0d0be90719f4106ec737365dcf5da4f5f43f6aa65079e7f12e24d3cf77bbe18a376e325580a2447f74b5078c5ba7_640.jpg',
        'https://pixabay.com/get/g58bbc66b532c7d661540c4a44188cd8436f69ec0e45459faaac1a5594e96df9470d8e719bd14116be3774ba909979162_640.jpg',
        'https://pixabay.com/get/g6a4248f85e34edf27661bf065bec1196f2c25d93d4cdc5d8b7bef37b6dd63d19f4d38e003f0ed23457e75eeffcf4aad3e73e8345931d777b3d6402dd56ea60b1_640.jpg',
        'https://pixabay.com/get/ga1894cf888441bb4510ac87c97b1bc40113ba72d4f562d432e199783d348c1b74f4d41e9face3d41d129553e545f89c4792dd50f3e5bce20bbd207d7a0001781_640.jpg',
        'https://pixabay.com/get/g8cfad1b859a6ccc1b6d1a0fa635fc2a463d0fc7cd8a80c59a7c1dc23388dea92b2e671aee3c13df38a7367f94a0b196a90aaf68627b2c987eda5cfbcf7cba89c_640.jpg',
        'https://pixabay.com/get/ge0d5c5ebe2c0fafb3c9e5b50917f3d88b2a3cacebfd4c52e59968e73324a7179e636f1f778f5dd374a9b39b6c6749195c3336814cef4d6eb2988e4aefb9eb262_640.jpg',
        'https://pixabay.com/get/ga22b27fa63ad9b12a0d06e5d2a4e04052f751cf36741659b5669e1746b867c3e5ceeb2331fd6e2ef9d427768fbbd5089f2ebd701ed23b59ae2c81afd0c308074_640.jpg',
        'https://pixabay.com/get/gbd69947c3d49dc56df861a392ed0a3c2c191b0a565acac291b83b3ae61195b0fce823bc8469beffb92c16e0a15b3ca3c31d684d08620d02f4d608f57ba40a7a0_640.jpg'
      ]
    }
  ]);
const [finalHeadings, setFinalHeadings] = useState([]);
const [isCopied, setIsCopied] = useState(false);
const [blogOptions, setBlogOptions] = useState({
  blogTopic: "",
  blogLength: "",
  writingStyle: "informative",
  seoKeywords: "",
  numberOfHeadings: "2",
  outputLanguage: "English",
});
const [errors, setErrors] = useState({});

// Set up effect to update editor content when generated content changes

const validateInputs = () => {
  const newErrors = {};
  if (!blogOptions.blogTopic.trim()) newErrors.blogTopic = true;
  if (!blogOptions.blogLength.trim()) newErrors.blogLength = true;
  if (!blogOptions.seoKeywords.trim()) newErrors.seoKeywords = true;
  if (!blogOptions.outputLanguage.trim()) newErrors.outputLanguage = true;

  setErrors(newErrors);

  if (Object.keys(newErrors).length > 0) {
    setApiError("Please fill in all required fields.");
    return false;
  }

  setApiError(null);
  return true;
};

const handleInputChange = (e) => {
  const { id, value } = e.target;
  setBlogOptions((prev) => ({
    ...prev,
    [id === 'blog-topic' ? 'blogTopic' :
      id === 'blog-length' ? 'blogLength' :
        id === 'writing-style' ? 'writingStyle' :
          id === 'seo-keywords' ? 'seoKeywords' :
            id === 'number-of-headings' ? 'numberOfHeadings' :
              id === 'output-language' ? 'outputLanguage' : id]: value
  }));

  if (errors[id === 'blog-topic' ? 'blogTopic' :
    id === 'blog-length' ? 'blogLength' :
      id === 'seo-keywords' ? 'seoKeywords' :
        id === 'output-language' ? 'outputLanguage' : id]) {
    setErrors((prev) => ({
      ...prev, [id === 'blog-topic' ? 'blogTopic' :
        id === 'blog-length' ? 'blogLength' :
          id === 'seo-keywords' ? 'seoKeywords' :
            id === 'output-language' ? 'outputLanguage' : id]: false
    }));
  }
};

const handleGenerateContent = async (e) => {
  e.preventDefault();

  if (!validateInputs()) return;

  setIsGenerating(true);
  try {
    // Call the blog generator API
    const response = await apiClient.ai.blogheadings({
      blogTopic: blogOptions.blogTopic,
      writingStyle: blogOptions.writingStyle,
      seoKeywords: blogOptions.seoKeywords,
      numberOfHeadings: blogOptions.numberOfHeadings,
      outputLanguage: blogOptions.outputLanguage,
    });
    console.log("Generated Headings:", response.headings);

    setShowHeadingPopup(true);
  } catch (error) {
    console.error("Error generating content:", error);
    setApiError(
      error.message || "Failed to generate content. Please try again."
    );
  } finally {
    setIsGenerating(false);
  }
};

const handleCopyContent = () => {
  navigator.clipboard.writeText(editorContent);
  setIsCopied(true);
  setTimeout(() => {
    setIsCopied(false);
  }, 2000); // Reset after 2 seconds
};

const handleSaveHeadings = (customizedHeadings) => {
  setFinalHeadings(customizedHeadings);
  setShowHeadingPopup(false);

  // Generate the blog content with the customized headings
  generateBlogWithHeadings(customizedHeadings);
};

const handleCancelHeadings = () => {
  setShowHeadingPopup(false);
  setBlogHeadings([]);
};

const generateBlogWithHeadings = async (headings) => {
  setIsGenerating(true);
  try {
    // Call the blog generator API with the customized headings
    const response = await apiClient.ai.blogGenerator({
      blogTopic: blogOptions.blogTopic,
      blogLength: blogOptions.blogLength,
      writingStyle: blogOptions.writingStyle,
      seoKeywords: blogOptions.seoKeywords,
      outputLanguage: blogOptions.outputLanguage,
      headings: headings, // Pass the customized headings
    });
    setGeneratedContent(response.blog);
  } catch (error) {
    console.log("Error generating blog content:", error);
    setApiError(
      error.message || "Failed to generate blog content. Please try again."
    );
  } finally {
    setIsGenerating(false);
  }
};

useEffect(() => {
  if (generatedContent) {
    setEditorContent(generatedContent);
  }
}, [generatedContent]);
return (
  <div className="space-y-6 text-white">
    {/* Blog Heading Popup */}
    <BlogHeadingPopup
      isOpen={showHeadingPopup}
      onClose={handleCancelHeadings}
      headings={blogHeadings}
      onSave={handleSaveHeadings}
      onCancel={handleCancelHeadings}
    />

    {/* Left Panel - Input Form */}
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-white">Blog Generation Settings</CardTitle>
          <CardDescription className="text-white">Configure your blog requirements</CardDescription>
        </CardHeader>
        <CardContent >
          <form className="grid grid-cols-3 gap-4">
            <div>
              <Label htmlFor="blog-topic" className="text-white">Blog Topic</Label>
              <Input
                id="blog-topic"
                placeholder="e.g., The Future of AI in Marketing"
                value={blogOptions.blogTopic}
                onChange={handleInputChange}
                className={`text-white ${errors.blogTopic ? "border-red-500" : ""}`}
              />
              {errors.blogTopic && <p className="text-red-500 text-sm mt-1">This field is required</p>}
            </div>
            <div>
              <Label htmlFor="blog-length" className="text-white">Blog Length</Label>
              <select
                id="blog-length"
                className="w-full mt-1 p-2 border border-gray-300 rounded-md text-white bg-transparent"
                value={blogOptions.blogLength}
                onChange={(e) =>
                  setBlogOptions({ ...blogOptions, blogLength: e.target.value })
                }
                required
              >
                <option hidden>Select length</option>
                <option value="300-500">300-500 words</option>
                <option value="500-1000">500-1000 words</option>
                <option value="1000-1500">1000-1500 words</option>
                <option value="1500-2500">1500-2500 words</option>
                <option value="3000+">3000+ words</option>
                <option value="4000+">4000+ words</option>
                <option value="5000+">5000+ words</option>
                <option value="7000+">7000+ words</option>
                <option value="9000+">9000+ words</option>
                <option value="12000+">12000+ words</option>
              </select>
            </div>
            <div>
              <Label htmlFor="number-of-headings" className="text-white">Number of headings</Label>
              <select
                id="number-of-headings"
                className="w-full mt-1 p-2 border border-gray-300 rounded-md text-white bg-transparent"
                value={blogOptions.numberOfHeadings}
                onChange={(e) =>
                  setBlogOptions({
                    ...blogOptions,
                    numberOfHeadings: e.target.value,
                  })
                }
                required
              >
                <option value="4">4 headings</option>
                <option value="5">5 headings</option>
                <option value="6">6 headings</option>
                <option value="7">7 headings</option>
                <option value="8">8 headings</option>
                <option value="9">9 headings</option>
                <option value="10">10 headings</option>
              </select>
            </div>
            <div>
              <Label htmlFor="writing-style" className="text-white">Writing Style</Label>
              <select
                id="writing-style"
                className="w-full mt-1 p-2 border border-gray-300 rounded-md text-white bg-transparent"
                value={blogOptions.writingStyle}
                required
                onChange={(e) =>
                  setBlogOptions({
                    ...blogOptions,
                    writingStyle: e.target.value,
                  })
                }
              >
                <option value="informative">Informative</option>
                <option value="conversational">Conversational</option>
                <option value="technical">Technical</option>
                <option value="storytelling">Storytelling</option>
              </select>
            </div>
            <div>
              <Label htmlFor="seo-keywords" className="text-white">SEO Focus Keywords</Label>
              <Input
                id="seo-keywords"
                placeholder="e.g., marketing, AI, content creation"
                value={blogOptions.seoKeywords}
                onChange={handleInputChange}
                className={`text-white ${errors.seoKeywords ? "border-red-500" : ""}`}
              />
              {errors.seoKeywords && <p className="text-red-500 text-sm mt-1">This field is required</p>}
            </div>
            <div>
              <Label htmlFor="output-language" className="text-white">Output Language</Label>
              <Input
                id="output-language"
                placeholder="e.g., Bangla, English, Spanish, French"
                value={blogOptions.outputLanguage}
                onChange={handleInputChange}
                className={`text-white ${errors.outputLanguage ? "border-red-500" : ""}`}
              />
              {errors.outputLanguage && <p className="text-red-500 text-sm mt-1">This field is required</p>}
            </div>
            <div>
              <div className="flex gap-1 items-center">
                <p className="text-xs text-white">✅</p>
                <Label htmlFor="human-like" className="text-white">
                  FAQ (Frequently Asked Questions)
                </Label>
              </div>
              <p className="text-sm text-white">
                Add frequently asked questions (FAQs) to the blog.
              </p>
            </div>
            <div>
              <div className="flex gap-1 items-center">
                <p className="text-xs text-white">✅</p>
                <Label htmlFor="human-like" className="text-white">Human like content</Label>
              </div>
              <p className="text-sm text-white">
                Generate content that is more human like.
              </p>
            </div>
            <div>
              <div className="flex gap-1 items-center">
                <p className="text-xs text-white">✅</p>
                <Label htmlFor="human-like" className="text-white">Image in the blog post</Label>
              </div>
              <p className="text-sm text-white">
                Add pixabay images to the blog post.
              </p>
            </div>
            <div className="col-span-3 flex flex-col items-center">
              {apiError && (
                <div className="text-red-500 text-sm mb-2">{apiError}</div>
              )}
              <Button
                onClick={handleGenerateContent}
                className="w-fit text-white"
                disabled={isGenerating}
                type="submit"
              >
                {isGenerating ? (
                  <>
                    <Sparkles className="mr-2 h-4 w-4 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Sparkles className="mr-2 h-4 w-4" />
                    Generate Blog
                  </>
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>

    {/* Right Panel - Generated Content with Rich Text Editor */}
    <div className="space-y-6">
      <Card className="h-full">
        <CardHeader>
          <CardTitle className="text-white">Generated Blog</CardTitle>
          <CardDescription className="text-white">
            Edit your AI-generated blog content
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {(finalHeadings.length > 0 && !generatedContent) && (
            <div className="mb-6 p-4 bg-gray-800/50 rounded-lg border border-gray-700">
              <h3 className="text-white font-semibold mb-3 flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-blue-400" />
                Selected Blog Structure
              </h3>
              <div className="space-y-3">
                {finalHeadings.map((heading, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 bg-gray-700/50 rounded-lg">
                    <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <p className="text-white font-medium">{heading.title}</p>
                    </div>
                    {heading.imageLink && (
                      <div className="w-12 h-12 rounded-lg overflow-hidden border border-gray-600">
                        <img
                          src={heading.imageLink}
                          alt={`Heading ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
          {generatedContent ? (
            <div className="space-y-4">
              <div className="bg-white/10 rounded-md min-h-[400px] whitespace-pre-wrap">
                <TiptapEditor
                  content={editorContent}
                  onUpdate={({ editor }) => {
                    setEditorContent(editor.getHTML());
                  }}
                />
              </div>
              <div className="flex space-x-2">
                <Button variant="glass" onClick={handleCopyContent} className="text-white">
                  <Copy className="mr-2 h-4 w-4" />
                  {isCopied ? "Copied ✔" : "Copy Blog"}
                </Button>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-[400px] rounded-md p-6 text-center">
              <FileText className="h-12 w-12 text-white mb-4" />
              <p className="text-white mb-2">
                Fill in the form and click Generate to create your blog post
              </p>
              <div className="flex flex-col gap-2 mt-4 w-full max-w-xs">
                <div className="flex items-center gap-2">
                  <PenTool className="h-4 w-4 text-white" />
                  <p className="text-sm text-white">
                    SEO-optimized content
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <BarChart className="h-4 w-4 text-white" />
                  <p className="text-sm text-white">
                    Engaging and informative articles
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-white" />
                  <p className="text-sm text-white">
                    Tailored to your target audience
                  </p>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
    <ContentPublisher
      content={editorContent}
      onPublished={() => {
        setGeneratedContent("");
        setEditorContent("");
        setBlogHeadings([]);
        setFinalHeadings([]);
        setBlogOptions({
          blogTopic: "",
          blogLength: "",
          writingStyle: "informative",
          seoKeywords: "",
          numberOfHeadings: "2",
          outputLanguage: "English",
        });
      }}
    />
  </div>
);
}
