<script lang="ts">
  import { adventurer } from '@dicebear/collection'
  import { createAvatar } from '@dicebear/core'
  import {
    collection,
    options,
    translationMap,
    SPECIAL_FEATURES,
    DEFAULT_OPTIONS_FOR_ITEMS_VISIBILITY,
    type AvatarOption,
  } from 'src/avatars/constants'

  let avatarOptions: Record<AvatarOption, string[]> = {
    earrings: [],
    eyebrows: ['variant10'],
    eyes: ['variant21'],
    glasses: [],
    features: [],
    hair: ['long10'],
    hairColor: ['6a4e35'],
    mouth: ['variant08'],
    skinColor: ['f2d3b1'],
    backgroundColor: ['f3f4f6'],
  }

  function avatarWithOptions(
    key: AvatarOption,
    value: string | null | undefined,
  ) {
    const newOptions = { ...avatarOptions, [key]: value ? [value] : [] }

    const avatar = createAvatar(adventurer, {
      size: 128,
      ...DEFAULT_OPTIONS_FOR_ITEMS_VISIBILITY,
      ...(newOptions as any),
    })

    return avatar.toDataUri()
  }

  function getOptions(tab: AvatarOption) {
    if (!SPECIAL_FEATURES.includes(tab)) {
      return collection[tab].default
    }

    return [
      null, // Special items must be not selectable
      ...collection[tab].default,
    ]
  }

  let selectedTab: AvatarOption = 'skinColor'

  $: svg = createAvatar(adventurer, {
    size: 256,
    ...DEFAULT_OPTIONS_FOR_ITEMS_VISIBILITY,
    ...(avatarOptions as any),
  }).toDataUri()
</script>

<header class="p-4 text-center border-b">Editor</header>

<!-- Container for main avatar -->
<div class="bg-gray-200 pt-6 pb-10 grid place-items-center">
  <img src={svg} alt="Avatar" class="size-40 rounded-xl" />
</div>

<!-- Editor -->
<div>
  <!-- Menu -->
  <div
    class="px-2 w-[100%] overflow-x-auto no-scrollbar flex rounded-t-xl -mt-4 bg-white"
  >
    {#each options as option (option)}
      {@const isSelected = selectedTab === option}
      <button
        class="py-2 px-3 whitespace-nowrap transition ease-in-out duration-500 border-b"
        class:border-blue-600={isSelected}
        class:text-blue-600={isSelected}
        class:text-gray-600={!isSelected}
        on:click={() => {
          selectedTab = option
        }}
      >
        {translationMap[option]}
      </button>
    {/each}
  </div>
  <!-- Avatar display -->
  <div class="grid grid-cols-3 gap-4 place-items-center p-4">
    {#each getOptions(selectedTab) as option (option)}
      <button
        on:click={() => {
          avatarOptions[selectedTab] = option ? [option] : []
        }}
      >
        <img
          src={avatarWithOptions(selectedTab, option)}
          alt={option}
          class="rounded-lg"
        />
      </button>
    {/each}
  </div>
</div>
