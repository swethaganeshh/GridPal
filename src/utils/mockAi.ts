export const mockSendMessageToAI = async (message: string): Promise<string> => {
  await new Promise(resolve => setTimeout(resolve, 1000));
  const lowerMessage = message.toLowerCase();

  const responses = [
    // --- THE GRID ---
    {
      keywords: ['what is the grid', 'grid in lukso'],
      response: `🟣 **The Grid** is a Web3-native social platform where users can showcase their **Universal Profiles**, NFTs, and digital assets.

Think: Instagram meets blockchain—but with verified, on-chain ownership. 💫`
    },
    {
      keywords: ['connect my profile to the grid', 'sign in to the grid'],
      response: `Just sign in to The Grid using your **Universal Profile Extension**. 🔐

It’ll auto-load your NFTs, tokens, and metadata, so your digital identity shines bright! ✨`
    },
    {
      keywords: ['post on the grid', 'what can i post'],
      response: `Unlike Web2 platforms, The Grid doesn't have "posts" — it **displays your digital identity**.

It showcases:
- NFTs you own 🎨
- Collections you're part of 🖼️
- Details from your Universal Profile 💁‍♀️`
    },
    {
      keywords: ['is the grid only for artists', 'only creators'],
      response: `Not at all! While artists love it, **The Grid is for everyone**:
- Creators ✨
- Collectors 💎
- Developers 🛠️
- Curious explorers 🧭

If you have a Universal Profile, you're in! 🟣`
    },
    {
      keywords: ['follow people on the grid', 'can i follow'],
      response: `Following and reacting isn’t live yet, but it’s part of The Grid’s **evolution roadmap**! 🛣️

For now, it’s all about **exploration, display, and inspiration**. 🌍`
    },
    {
      keywords: ['view other profiles on the grid', 'see others'],
      response: `Absolutely! The Grid is made for **digital discovery**. 🔍

Browse other Universal Profiles, explore NFTs, and get inspired by self-expression on-chain. 💜`
    },
    {
      keywords: ['are collectibles verified', 'verified nfts on the grid'],
      response: `Yes — everything shown on The Grid is **verified on-chain**! ✅

No fakes. Just real, provably owned assets linked to Universal Profiles. 🔗`
    },
    {
      keywords: ['sell nfts on the grid', 'trade on the grid'],
      response: `The Grid is more like a **gallery** than a marketplace. 🖼️

You can’t trade NFTs directly there (yet), but you can link to external platforms or use LUKSO tools to manage trades! 🔁`
    },
    {
      keywords: ['mobile version of the grid', 'grid on phone'],
      response: `The Grid is currently optimized for **desktop browsers**. 🖥️

A mobile version is on the roadmap for seamless Web3 vibes on-the-go. 📱🚀`
    },
    {
      keywords: ['grid vs opensea', 'grid vs lens'],
      response: `Good comparison! 🤓

- **OpenSea** = NFT marketplace 🛒  
- **Lens Protocol** = social graph 🧠  
- **The Grid** = curated digital identity wall ✨  
It’s Web3, but aesthetic and authentic. 🎨🟣`
    },

    // --- UNIVERSAL PROFILE ---
    {
      keywords: ['universal profile extension'],
      response: `The Universal Profile Extension is a browser-based tool that lets you create and manage your digital identity on the LUKSO blockchain.

Think of it like your Web3 passport — it stores your profile data, NFT collectibles, tokens, and even lets you interact with smart contracts, all under your control! 🔐🪪`
    },
    {
      keywords: ['create multiple profiles', 'multiple universal profiles'],
      response: `Yes, bestie! 🌈 You can create **multiple Universal Profiles** — each one is a unique identity on the blockchain.

Just remember: each profile has its own address and might require LYX to deploy. Perfect if you’re a creator, brand, or just vibing with different personas! 👯‍♀️`
    },
    {
      keywords: ['safe to store', 'collectibles', 'store nfts'],
      response: `Absolutely! ✅ Your Universal Profile is built on the secure LUKSO blockchain.

Your NFTs, tokens, and metadata are protected by decentralized encryption and ownership rules. Just make sure to **back up your credentials or set up recovery**! 🔐🎨`
    },
    {
      keywords: ['recover profile', 'lost access', 'recovery'],
      response: `Lost access? 😱 Don’t panic.

If you've set up **recovery options** like trusted addresses or social recovery, you can **regain control** of your Universal Profile even if you lose your device. Web3 just got human-friendly 👨‍👩‍👧‍👦🔑`
    },
    {
      keywords: ['difference', 'metamask', 'universal profile vs'],
      response: `Great Q! 🤓

While MetaMask is a basic wallet, **Universal Profiles** are a full-blown identity layer:
- They support **metadata**, **permissions**, and **recovery options**
- Think: your Web3 identity vs just an address!

Perfect for creators, social apps, and more 🌍✨`
    },
    {
      keywords: ['mobile', 'use on phone'],
      response: `Right now, the Universal Profile Extension is for **desktop browsers** (Chrome, Brave, etc).

But don’t worry — mobile-friendly LUKSO apps are in the works! 📱💜
Stay tuned for full-on Web3 vibes on the go.`
    },
    {
      keywords: ['need lyx', 'require lyx', 'create universal profile'],
      response: `Yep! 🪙 You’ll need a small amount of **LYX**, LUKSO’s native token, to create and deploy your Universal Profile.

It covers gas fees for deploying your smart contract identity. A little LYX goes a long way! 💫`
    },
    {
      keywords: ['emoji', 'profile name'],
      response: `You bet! 🎉

Universal Profiles support **emojis, special characters, and full metadata customization**.

Feel free to sprinkle personality into your profile: 🎨😎💎`
    },
    {
      keywords: ['profile public', 'visible', 'who can see'],
      response: `By default, your Universal Profile info is **public** — kinda like a Web3 social profile.

But you choose what to share — bio, image, links, and assets. Total transparency, total control 💡🧬`
    },
    {
      keywords: ['use profile in dapps', 'use in other apps'],
      response: `Absolutely! 🤝 Universal Profiles are made for interoperability.

You can use your profile across **LUKSO-powered dApps** — log in, show off your assets, or interact with apps seamlessly 🔗✨`
    },

    // --- DEFAULTS / INTRO ---
    {
      keywords: ['hello', 'hi', 'hey'],
      response: `Hey bestie! 🌸 I’m GridPal, your friendly LUKSO/Web3 tour guide.

I can help you:
- Create a Universal Profile 🪪
- Explore The Grid 🟣
- Understand NFTs, LSPs, and Web3 ✨
- Discover apps and earn tokens 😎

What are we learning today, cutie? 💻🌈`
    },
    {
      keywords: ['universal profile'],
      response: `Universal Profiles are your digital passport in the Web3 world 🪪✨

They go beyond traditional wallets by offering:
- A profile picture 💁
- Bio & social links 🌐
- A vault for NFTs, tokens, and even permissions! 🔐

It’s YOU, but on the blockchain. Want help creating one? Just say: "guide me bestie 💅"`
    },
    {
      keywords: ['universal profile', 'up'],
      response: `Universal Profiles are your digital passport in the Web3 world 🪪✨

They go beyond traditional wallets by offering:
- A profile picture 💁
- Bio & social links 🌐
- A vault for NFTs, tokens, and even permissions! 🔐

It’s YOU, but on the blockchain. Want help creating one? Just say: "guide me bestie 💅"`
    },
    {
      keywords: ['create', 'universal profile'],
      response: `Yaaay! 🎉 You're ready to create your Universal Profile (UP) — your Web3 identity!

Here’s how to get started:
1. **Install the [Universal Profile Extension](https://chrome.google.com/webstore/detail/universal-profiles/knapfefhnmjpnajbecdcbfjjbgnleelo)**
2. Open it and click **"Create New Profile"**
3. Customize your picture, bio, and links 🧑‍🎤
4. Voilà — welcome to Web3!

Want a step-by-step walkthrough? Just ask: "step by step pls 🪄"`
    },
    {
      keywords: ['lsp', 'standard'],
      response: `LSPs (LUKSO Standard Proposals) are the building blocks of the ecosystem 🔧

They're like LEGO pieces that fit together. Here are a few:
- **LSP0**: Base for Universal Profile
- **LSP1**: Notification receiver
- **LSP3**: Profile Metadata
- **LSP7**: Tokens (like LYX)
- **LSP8**: NFTs with metadata 🎨

Ask me for details on any LSP (like "What is LSP3?") 🧠`
    },
    {
      keywords: ['grid', 'the grid'],
      response: `The Grid is like Instagram + Discord + NFT Gallery = LUKSO style 🎨✨

It lets you:
- Show off your Universal Profile
- Display your collectibles
- Join communities
- Connect with creators

Start vibing at [thegrid.io](https://thegrid.io) — wanna know how to post or explore?`
    },
    {
      keywords: ['what is blockchain', 'web3'],
      response: `Alright bestie 💻✨ let’s get Web3 smart!

- **Blockchain** = a magical notebook everyone can read but no one can erase 📖
- **Web3** = the internet where YOU own your data, assets, and identity 🔐
- **LUKSO** = Web3’s fashion-forward cousin 💃 — perfect for creators, brands, and culture!

Want a visual guide or a Web3 glossary?`
    },
    {
      keywords: ['nft', 'digital asset'],
      response: `LUKSO handles NFTs and digital assets with superpowers 💫

- **LSP7** = For regular tokens (like LYX)
- **LSP8** = For unique items (NFTs, art, collectibles)

What’s cool? They work with your Universal Profile. So your art, tickets, or even loyalty cards can live right there with your digital self! 🎟️🖼️

Wanna mint your first NFT on LUKSO?`
    },
    {
      keywords: ['mini apps', 'lukso apps'],
      response: `Omg yesss 🎉 mini apps are where the fun begins!

Explore these LUKSO tools & apps:
- 🪪 [Universal Profile Explorer](https://universalprofile.cloud)
- 📸 [The Grid](https://thegrid.io)
- 🧰 [LUKSO Tools](https://tools.lukso.network)
- 📦 [LUKSO Docs + Dev Tools](https://docs.lukso.tech)

Wanna try creating or interacting with an app? I’ll walk you through!`
    },
    {
      keywords: ['joke', 'meme'],
      response: `Sure thing 😂 Here’s a Web3 joke for you:

**Why did the NFT go broke?**
👉 Because it kept getting flipped! 💸

Wanna see a LUKSO meme or a cute Web3 comic strip? Just say "show me the vibes"`
    },
    {
      keywords: ['hello', 'hi', 'hey'],
      response: `Hey bestie! 🌸 I’m GridPal, your friendly LUKSO/Web3 tour guide.

I can help you:
- Create a Universal Profile 🪪
- Understand NFTs, LSPs, and Web3 ✨
- Explore apps, earn tokens, and vibe 😎

What are we learning today, cutie? 💻🌈`
    }
  ];

  for (const { keywords, response } of responses) {
    if (keywords.some(keyword => lowerMessage.includes(keyword))) {
      return response;
    }
  }

  return `Thanks for your message about "${message.substring(0, 30)}${message.length > 30 ? '...' : ''}" 💌

I'm GridPal — your Web3 bff 🤖💜

I can help with:
- Universal Profile setup 🛠️
- Exploring The Grid 🟣
- Learning about NFTs & Web3 🔍
- And even sending you memes 😂

Let’s learn, laugh, and build together! What do you wanna do?`;
};
