/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

/** ActionItemBankResponseSchema */
export interface ActionItemBankResponseSchema {
  data: BankItemSchema;
}

/** ActiveEventSchema */
export interface ActiveEventSchema {
  /**
   * Name
   * Name of the event.
   */
  name: string;
  /** Map of the event. */
  map: MapSchema;
  /**
   * Previous Skin
   * Previous map skin.
   */
  previous_skin: string;
  /**
   * Duration
   * Duration in minutes.
   */
  duration: number;
  /**
   * Expiration
   * Expiration datetime.
   * @format date-time
   */
  expiration: string;
  /**
   * Created At
   * Start datetime.
   * @format date-time
   */
  created_at: string;
}

/** AddAccountSchema */
export interface AddAccountSchema {
  /**
   * Username
   * Your desired username.
   * @minLength 6
   * @maxLength 32
   * @pattern ^[a-zA-Z0-9_-]+$
   */
  username: string;
  /**
   * Password
   * Your password.
   * @minLength 5
   * @maxLength 50
   * @pattern ^[^\s]+$
   */
  password: string;
  /**
   * Email
   * Your email.
   * @format email
   */
  email: string;
}

/** AddCharacterSchema */
export interface AddCharacterSchema {
  /**
   * Name
   * Your desired character name. It's unique and all players can see it.
   * @minLength 3
   * @maxLength 12
   * @pattern ^[a-zA-Z0-9_-]+$
   */
  name: string;
  /**
   * Skin
   * Your desired skin.
   */
  skin: "men1" | "men2" | "men3" | "women1" | "women2" | "women3";
}

/** AnnouncementSchema */
export interface AnnouncementSchema {
  /**
   * Message
   * Announcement text.
   */
  message: string;
  /**
   * Created At
   * Datetime of the announcement.
   * @format date-time
   */
  created_at?: string;
}

/** BankItemSchema */
export interface BankItemSchema {
  /** Cooldown details. */
  cooldown: CooldownSchema;
  /** Item details. */
  item: ItemSchema;
  /**
   * Bank
   * Items in your banks.
   */
  bank: SimpleItemSchema[];
  /** Player details. */
  character: CharacterSchema;
}

/** BlockedHitsSchema */
export interface BlockedHitsSchema {
  /**
   * Fire
   * The amount of fire hits blocked.
   */
  fire: number;
  /**
   * Earth
   * The amount of earth hits blocked.
   */
  earth: number;
  /**
   * Water
   * The amount of water hits blocked.
   */
  water: number;
  /**
   * Air
   * The amount of air hits blocked.
   */
  air: number;
  /**
   * Total
   * The amount of total hits blocked.
   */
  total: number;
}

/** ChangePassword */
export interface ChangePassword {
  /**
   * Password
   * Your password.
   * @minLength 5
   * @maxLength 50
   * @pattern ^[^\s]+$
   */
  password: string;
}

/** CharacterFightDataSchema */
export interface CharacterFightDataSchema {
  /** Cooldown details. */
  cooldown: CooldownSchema;
  /** Fight details. */
  fight: FightSchema;
  /** Player details. */
  character: CharacterSchema;
}

/** CharacterFightResponseSchema */
export interface CharacterFightResponseSchema {
  data: CharacterFightDataSchema;
}

/** CharacterMovementDataSchema */
export interface CharacterMovementDataSchema {
  /** Cooldown details */
  cooldown: CooldownSchema;
  /** Destination details. */
  destination: MapSchema;
  /** Character details. */
  character: CharacterSchema;
}

/** CharacterMovementResponseSchema */
export interface CharacterMovementResponseSchema {
  data: CharacterMovementDataSchema;
}

/** CharacterResponseSchema */
export interface CharacterResponseSchema {
  data: CharacterSchema;
}

/** CharacterSchema */
export interface CharacterSchema {
  /**
   * Name
   * Name of the character.
   */
  name: string;
  /**
   * Skin
   * Character skin code.
   */
  skin: "men1" | "men2" | "men3" | "women1" | "women2" | "women3";
  /**
   * Level
   * Combat level.
   */
  level: number;
  /**
   * Xp
   * The current xp level of the combat level.
   */
  xp: number;
  /**
   * Max Xp
   * XP required to level up the character.
   */
  max_xp: number;
  /**
   * Total Xp
   * Total XP of your character.
   */
  total_xp: number;
  /**
   * Gold
   * The numbers of golds on this character.
   */
  gold: number;
  /**
   * Speed
   * *Not available, on the roadmap. Character movement speed.
   */
  speed: number;
  /**
   * Mining Level
   * Mining level.
   */
  mining_level: number;
  /**
   * Mining Xp
   * The current xp level of the Mining skill.
   */
  mining_xp: number;
  /**
   * Mining Max Xp
   * Mining XP required to level up the skill.
   */
  mining_max_xp: number;
  /**
   * Woodcutting Level
   * Woodcutting level.
   */
  woodcutting_level: number;
  /**
   * Woodcutting Xp
   * The current xp level of the Woodcutting skill.
   */
  woodcutting_xp: number;
  /**
   * Woodcutting Max Xp
   * Woodcutting XP required to level up the skill.
   */
  woodcutting_max_xp: number;
  /**
   * Fishing Level
   * Fishing level.
   */
  fishing_level: number;
  /**
   * Fishing Xp
   * The current xp level of the Fishing skill.
   */
  fishing_xp: number;
  /**
   * Fishing Max Xp
   * Fishing XP required to level up the skill.
   */
  fishing_max_xp: number;
  /**
   * Weaponcrafting Level
   * Weaponcrafting level.
   */
  weaponcrafting_level: number;
  /**
   * Weaponcrafting Xp
   * The current xp level of the Weaponcrafting skill.
   */
  weaponcrafting_xp: number;
  /**
   * Weaponcrafting Max Xp
   * Weaponcrafting XP required to level up the skill.
   */
  weaponcrafting_max_xp: number;
  /**
   * Gearcrafting Level
   * Gearcrafting level.
   */
  gearcrafting_level: number;
  /**
   * Gearcrafting Xp
   * The current xp level of the Gearcrafting skill.
   */
  gearcrafting_xp: number;
  /**
   * Gearcrafting Max Xp
   * Gearcrafting XP required to level up the skill.
   */
  gearcrafting_max_xp: number;
  /**
   * Jewelrycrafting Level
   * Jewelrycrafting level.
   */
  jewelrycrafting_level: number;
  /**
   * Jewelrycrafting Xp
   * The current xp level of the Jewelrycrafting skill.
   */
  jewelrycrafting_xp: number;
  /**
   * Jewelrycrafting Max Xp
   * Jewelrycrafting XP required to level up the skill.
   */
  jewelrycrafting_max_xp: number;
  /**
   * Cooking Level
   * The current xp level of the Cooking skill.
   */
  cooking_level: number;
  /**
   * Cooking Xp
   * Cooking XP.
   */
  cooking_xp: number;
  /**
   * Cooking Max Xp
   * Cooking XP required to level up the skill.
   */
  cooking_max_xp: number;
  /**
   * Hp
   * Character HP.
   */
  hp: number;
  /**
   * Haste
   * *Character Haste. Increase speed attack (reduce fight cooldown)
   */
  haste: number;
  /**
   * Critical Strike
   * *Not available, on the roadmap. Character Critical   Strike. Critical strikes increase the attack's damage.
   */
  critical_strike: number;
  /**
   * Stamina
   * *Not available, on the roadmap. Regenerates life at the start of each turn.
   */
  stamina: number;
  /**
   * Attack Fire
   * Fire attack.
   */
  attack_fire: number;
  /**
   * Attack Earth
   * Earth attack.
   */
  attack_earth: number;
  /**
   * Attack Water
   * Water attack.
   */
  attack_water: number;
  /**
   * Attack Air
   * Air attack.
   */
  attack_air: number;
  /**
   * Dmg Fire
   * % Fire damage.
   */
  dmg_fire: number;
  /**
   * Dmg Earth
   * % Earth damage.
   */
  dmg_earth: number;
  /**
   * Dmg Water
   * % Water damage.
   */
  dmg_water: number;
  /**
   * Dmg Air
   * % Air damage.
   */
  dmg_air: number;
  /**
   * Res Fire
   * % Fire resistance.
   */
  res_fire: number;
  /**
   * Res Earth
   * % Earth resistance.
   */
  res_earth: number;
  /**
   * Res Water
   * % Water resistance.
   */
  res_water: number;
  /**
   * Res Air
   * % Air resistance.
   */
  res_air: number;
  /**
   * X
   * Character x coordinate.
   */
  x: number;
  /**
   * Y
   * Character y coordinate.
   */
  y: number;
  /**
   * Cooldown
   * Cooldown in seconds.
   */
  cooldown: number;
  /**
   * Cooldown Expiration
   * Datetime Cooldown expiration.
   */
  cooldown_expiration?: string | null;
  /**
   * Weapon Slot
   * Weapon slot.
   */
  weapon_slot: string;
  /**
   * Shield Slot
   * Shield slot.
   */
  shield_slot: string;
  /**
   * Helmet Slot
   * Helmet slot.
   */
  helmet_slot: string;
  /**
   * Body Armor Slot
   * Body armor slot.
   */
  body_armor_slot: string;
  /**
   * Leg Armor Slot
   * Leg armor slot.
   */
  leg_armor_slot: string;
  /**
   * Boots Slot
   * Boots slot.
   */
  boots_slot: string;
  /**
   * Ring1 Slot
   * Ring 1 slot.
   */
  ring1_slot: string;
  /**
   * Ring2 Slot
   * Ring 2 slot.
   */
  ring2_slot: string;
  /**
   * Amulet Slot
   * Amulet slot.
   */
  amulet_slot: string;
  /**
   * Artifact1 Slot
   * Artifact 1 slot.
   */
  artifact1_slot: string;
  /**
   * Artifact2 Slot
   * Artifact 2 slot.
   */
  artifact2_slot: string;
  /**
   * Artifact3 Slot
   * Artifact 3 slot.
   */
  artifact3_slot: string;
  /**
   * Consumable1 Slot
   * Consumable 1 slot.
   */
  consumable1_slot: string;
  /**
   * Consumable1 Slot Quantity
   * Consumable 1 quantity.
   */
  consumable1_slot_quantity: number;
  /**
   * Consumable2 Slot
   * Consumable 2 slot.
   */
  consumable2_slot: string;
  /**
   * Consumable2 Slot Quantity
   * Consumable 2 quantity.
   */
  consumable2_slot_quantity: number;
  /**
   * Task
   * Task in progress.
   */
  task: string;
  /**
   * Task Type
   * Task type.
   */
  task_type: string;
  /**
   * Task Progress
   * Task progression.
   */
  task_progress: number;
  /**
   * Task Total
   * Task total objective.
   */
  task_total: number;
  /**
   * Inventory Max Items
   * Inventory max items.
   */
  inventory_max_items: number;
  /**
   * Inventory
   * List of inventory slots.
   */
  inventory?: InventorySlot[];
}

/** CooldownSchema */
export interface CooldownSchema {
  /**
   * Total Seconds
   * The total seconds of the cooldown.
   */
  total_seconds: number;
  /**
   * Remaining Seconds
   * The remaining seconds of the cooldown.
   */
  remaining_seconds: number;
  /**
   * Started At
   * The start of the cooldown.
   * @format date-time
   */
  started_at: string;
  /**
   * Expiration
   * The expiration of the cooldown.
   * @format date-time
   */
  expiration: string;
  /**
   * Reason
   * The reason of the cooldown.
   */
  reason:
    | "movement"
    | "fight"
    | "crafting"
    | "gathering"
    | "buy_ge"
    | "sell_ge"
    | "delete_item"
    | "deposit_bank"
    | "withdraw_bank"
    | "equip"
    | "unequip"
    | "task"
    | "recycling";
}

/** CraftSchema */
export interface CraftSchema {
  /**
   * Skill code
   * Skill required to craft the item.
   */
  skill?: "weaponcrafting" | "gearcrafting" | "jewelrycrafting" | "cooking" | "woodcutting" | "mining" | null;
  /**
   * Level
   * The skill level required to craft the item.
   */
  level?: number | null;
  /**
   * Items
   * List of items required to craft the item.
   */
  items?: SimpleItemSchema[];
  /**
   * Quantity
   * Quantity of items crafted.
   */
  quantity?: number | null;
}

/** CraftingSchema */
export interface CraftingSchema {
  /**
   * Craft code
   * Craft code.
   * @pattern ^[a-zA-Z0-9_-]+$
   */
  code: string;
  /**
   * Quantity
   * Quantity of items to craft.
   * @min 1
   * @default 1
   */
  quantity?: number;
}

/** DataPage[ActiveEventSchema] */
export interface DataPageActiveEventSchema {
  /** Data */
  data: ActiveEventSchema[];
  /** Total */
  total: number | null;
  /** Page */
  page: number | null;
  /** Size */
  size: number | null;
  /** Pages */
  pages?: number | null;
}

/** DataPage[CharacterSchema] */
export interface DataPageCharacterSchema {
  /** Data */
  data: CharacterSchema[];
  /** Total */
  total: number | null;
  /** Page */
  page: number | null;
  /** Size */
  size: number | null;
  /** Pages */
  pages?: number | null;
}

/** DataPage[GEItemSchema] */
export interface DataPageGEItemSchema {
  /** Data */
  data: GEItemSchema[];
  /** Total */
  total: number | null;
  /** Page */
  page: number | null;
  /** Size */
  size: number | null;
  /** Pages */
  pages?: number | null;
}

/** DataPage[ItemSchema] */
export interface DataPageItemSchema {
  /** Data */
  data: ItemSchema[];
  /** Total */
  total: number | null;
  /** Page */
  page: number | null;
  /** Size */
  size: number | null;
  /** Pages */
  pages?: number | null;
}

/** DataPage[LogSchema] */
export interface DataPageLogSchema {
  /** Data */
  data: LogSchema[];
  /** Total */
  total: number | null;
  /** Page */
  page: number | null;
  /** Size */
  size: number | null;
  /** Pages */
  pages?: number | null;
}

/** DataPage[MapSchema] */
export interface DataPageMapSchema {
  /** Data */
  data: MapSchema[];
  /** Total */
  total: number | null;
  /** Page */
  page: number | null;
  /** Size */
  size: number | null;
  /** Pages */
  pages?: number | null;
}

/** DataPage[MonsterSchema] */
export interface DataPageMonsterSchema {
  /** Data */
  data: MonsterSchema[];
  /** Total */
  total: number | null;
  /** Page */
  page: number | null;
  /** Size */
  size: number | null;
  /** Pages */
  pages?: number | null;
}

/** DataPage[ResourceSchema] */
export interface DataPageResourceSchema {
  /** Data */
  data: ResourceSchema[];
  /** Total */
  total: number | null;
  /** Page */
  page: number | null;
  /** Size */
  size: number | null;
  /** Pages */
  pages?: number | null;
}

/** DataPage[SimpleItemSchema] */
export interface DataPageSimpleItemSchema {
  /** Data */
  data: SimpleItemSchema[];
  /** Total */
  total: number | null;
  /** Page */
  page: number | null;
  /** Size */
  size: number | null;
  /** Pages */
  pages?: number | null;
}

/** DeleteCharacterSchema */
export interface DeleteCharacterSchema {
  /**
   * Name
   * Character name.
   * @minLength 3
   * @maxLength 12
   * @pattern ^[a-zA-Z0-9_-]+$
   */
  name: string;
}

/** DeleteItemResponseSchema */
export interface DeleteItemResponseSchema {
  data: DeleteItemSchema;
}

/** DeleteItemSchema */
export interface DeleteItemSchema {
  /** Cooldown details. */
  cooldown: CooldownSchema;
  /** Item details. */
  item: SimpleItemSchema;
  /** Player details. */
  character: CharacterSchema;
}

/** DepositWithdrawGoldSchema */
export interface DepositWithdrawGoldSchema {
  /**
   * Quantity
   * Quantity of gold.
   * @min 1
   */
  quantity: number;
}

/** DestinationSchema */
export interface DestinationSchema {
  /**
   * X
   * The x coordinate of the destination.
   */
  x: number;
  /**
   * Y
   * The y coordinate of the destination.
   */
  y: number;
}

/** DropRateSchema */
export interface DropRateSchema {
  /**
   * Item code
   * Item code.
   * @pattern ^[a-zA-Z0-9_-]+$
   */
  code: string;
  /**
   * Rate
   * Chance rate.
   * @min 1
   */
  rate: number;
  /**
   * Min Quantity
   * Minimum quantity.
   * @min 1
   */
  min_quantity: number;
  /**
   * Max Quantity
   * Maximum quantity.
   * @min 1
   */
  max_quantity: number;
}

/** DropSchema */
export interface DropSchema {
  /**
   * Code
   * The code of the item.
   */
  code: string;
  /**
   * Quantity
   * The quantity of the item.
   */
  quantity: number;
}

/** EquipRequestSchema */
export interface EquipRequestSchema {
  /** Cooldown details. */
  cooldown: CooldownSchema;
  /**
   * Slot
   * Item slot.
   */
  slot:
    | "weapon"
    | "shield"
    | "helmet"
    | "body_armor"
    | "leg_armor"
    | "boots"
    | "ring1"
    | "ring2"
    | "amulet"
    | "artifact1"
    | "artifact2"
    | "artifact3"
    | "consumable1"
    | "consumable2";
  /** Item details. */
  item: ItemSchema;
  /** Player details. */
  character: CharacterSchema;
}

/** EquipSchema */
export interface EquipSchema {
  /**
   * Code
   * Item code.
   * @pattern ^[a-zA-Z0-9_-]+$
   */
  code: string;
  /**
   * Slot
   * Item slot.
   */
  slot:
    | "weapon"
    | "shield"
    | "helmet"
    | "body_armor"
    | "leg_armor"
    | "boots"
    | "ring1"
    | "ring2"
    | "amulet"
    | "artifact1"
    | "artifact2"
    | "artifact3"
    | "consumable1"
    | "consumable2";
}

/** EquipmentResponseSchema */
export interface EquipmentResponseSchema {
  data: EquipRequestSchema;
}

/** FightSchema */
export interface FightSchema {
  /**
   * Xp
   * The amount of xp gained by the fight.
   */
  xp: number;
  /**
   * Gold
   * The amount of gold gained by the fight.
   */
  gold: number;
  /**
   * Drops
   * The items dropped by the fight.
   */
  drops: DropSchema[];
  /**
   * Turns
   * Numbers of the turns of the combat.
   */
  turns: number;
  /** The amount of blocked hits by the monster. */
  monster_blocked_hits: BlockedHitsSchema;
  /** The amount of blocked hits by the player. */
  player_blocked_hits: BlockedHitsSchema;
  /**
   * Logs
   * The fight logs.
   */
  logs: string[];
  /**
   * Result
   * The result of the fight.
   */
  result: "win" | "lose";
}

/** GEItemResponseSchema */
export interface GEItemResponseSchema {
  data: GEItemSchema;
}

/** GEItemSchema */
export interface GEItemSchema {
  /**
   * Code
   * Item code.
   */
  code: string;
  /**
   * Stock
   * Item stock.
   */
  stock: number;
  /**
   * Sell Price
   * The item's selling price.
   */
  sell_price?: number;
  /**
   * Buy Price
   * The item's buying price.
   */
  buy_price?: number;
}

/** GETransactionItemSchema */
export interface GETransactionItemSchema {
  /**
   * Code
   * Item code.
   * @pattern ^[a-zA-Z0-9_-]+$
   */
  code: string;
  /**
   * Quantity
   * Item quantity.
   * @min 1
   * @max 50
   */
  quantity: number;
  /**
   * Price
   * Item price. Item price validation protects you if the price has changed since you last checked the buy/sale price of an item.
   * @min 1
   */
  price: number;
}

/** GETransactionListSchema */
export interface GETransactionListSchema {
  /** Cooldown details. */
  cooldown: CooldownSchema;
  /** Transaction details. */
  transaction: GETransactionSchema;
  /** Character details. */
  character: CharacterSchema;
}

/** GETransactionResponseSchema */
export interface GETransactionResponseSchema {
  data: GETransactionListSchema;
}

/** GETransactionSchema */
export interface GETransactionSchema {
  /**
   * Code
   * Item code.
   */
  code: string;
  /**
   * Quantity
   * Item quantity.
   */
  quantity: number;
  /**
   * Price
   * Item price.
   */
  price: number;
  /**
   * Total Price
   * Total price of the transaction.
   */
  total_price: number;
}

/** GoldBankResponseSchema */
export interface GoldBankResponseSchema {
  data: GoldSchema;
}

/** GoldResponseSchema */
export interface GoldResponseSchema {
  data: GoldTransactionSchema;
}

/** GoldSchema */
export interface GoldSchema {
  /**
   * Quantity
   * Quantity of gold.
   * @min 0
   */
  quantity: number;
}

/** GoldTransactionSchema */
export interface GoldTransactionSchema {
  /** Cooldown details. */
  cooldown: CooldownSchema;
  /** Bank details. */
  bank: GoldSchema;
  /** Player details. */
  character: CharacterSchema;
}

/** HTTPValidationError */
export interface HTTPValidationError {
  /** Detail */
  detail?: ValidationError[];
}

/** InventorySlot */
export interface InventorySlot {
  /**
   * Slot
   * Inventory slot identifier.
   */
  slot: number;
  /**
   * Code
   * Item code.
   */
  code: string;
  /**
   * Quantity
   * Quantity in the slot.
   */
  quantity: number;
}

/** ItemEffectSchema */
export interface ItemEffectSchema {
  /**
   * Name
   * Effect name.
   */
  name: string;
  /**
   * Value
   * Effect value.
   */
  value: number;
}

/** ItemResponseSchema */
export interface ItemResponseSchema {
  data: SingleItemSchema;
}

/** ItemSchema */
export interface ItemSchema {
  /**
   * Name
   * Item name.
   */
  name: string;
  /**
   * Code
   * Item code. This is the item's unique identifier (ID).
   */
  code: string;
  /**
   * Level
   * Item level.
   * @min 1
   */
  level: number;
  /**
   * Type
   * Item type.
   */
  type: string;
  /**
   * Subtype
   * Item subtype.
   */
  subtype: string;
  /**
   * Description
   * Item description.
   */
  description: string;
  /**
   * Effects
   * List of object effects. For equipment, it will include item stats.
   */
  effects?: ItemEffectSchema[];
  /** Craft information. If applicable. */
  craft?: CraftSchema | null;
}

/** LogSchema */
export interface LogSchema {
  /**
   * Character
   * Character name.
   */
  character: string;
  /**
   * Account
   * Account character.
   */
  account: string;
  /**
   * Type
   * Type of action.
   */
  type: string;
  /**
   * Description
   * Description of action.
   */
  description: string;
  /**
   * Content
   * Content of action.
   */
  content: any;
  /**
   * Cooldown
   * Cooldown in seconds.
   */
  cooldown: number;
  /**
   * Cooldown Expiration
   * Datetime of cooldown expiration.
   * @format date-time
   */
  cooldown_expiration: string;
  /**
   * Created At
   * Datetime of creation.
   * @format date-time
   */
  created_at: string;
}

/** MapContentSchema */
export interface MapContentSchema {
  /**
   * Type
   * Type of the content.
   */
  type: string;
  /**
   * Code
   * Code of the content.
   */
  code: string;
}

/** MapResponseSchema */
export interface MapResponseSchema {
  data: MapSchema;
}

/** MapSchema */
export interface MapSchema {
  /**
   * Name
   * Name of the map.
   */
  name: string;
  /**
   * Skin
   * Skin of the map.
   */
  skin: string;
  /**
   * X
   * Position X of the map.
   */
  x: number;
  /**
   * Y
   * Position Y of the map.
   */
  y: number;
  /** Content of the map. */
  content: MapContentSchema | null;
}

/** MonsterResponseSchema */
export interface MonsterResponseSchema {
  data: MonsterSchema;
}

/** MonsterSchema */
export interface MonsterSchema {
  /**
   * Name
   * Name of the monster.
   */
  name: string;
  /**
   * Code
   * The code of the monster. This is the monster's unique identifier (ID).
   */
  code: string;
  /**
   * Level
   * Monster level.
   */
  level: number;
  /**
   * Hp
   * Monster hit points.
   */
  hp: number;
  /**
   * Attack Fire
   * Monster fire attack.
   */
  attack_fire: number;
  /**
   * Attack Earth
   * Monster earth attack.
   */
  attack_earth: number;
  /**
   * Attack Water
   * Monster water attack.
   */
  attack_water: number;
  /**
   * Attack Air
   * Monster air attack.
   */
  attack_air: number;
  /**
   * Res Fire
   * Monster % fire resistance.
   */
  res_fire: number;
  /**
   * Res Earth
   * Monster % earth resistance.
   */
  res_earth: number;
  /**
   * Res Water
   * Monster % water resistance.
   */
  res_water: number;
  /**
   * Res Air
   * Monster % air resistance.
   */
  res_air: number;
  /**
   * Min Gold
   * Monster minimum gold drop.
   */
  min_gold: number;
  /**
   * Max Gold
   * Monster maximum gold drop.
   */
  max_gold: number;
  /**
   * Drops
   * Monster drops. This is a list of items that the monster drops after killing the monster.
   */
  drops: DropRateSchema[];
}

/** MyCharactersListSchema */
export interface MyCharactersListSchema {
  /**
   * Data
   * List of your characters.
   */
  data: CharacterSchema[];
}

/** RecyclingDataSchema */
export interface RecyclingDataSchema {
  /** Cooldown details. */
  cooldown: CooldownSchema;
  /** Craft details. */
  details: RecyclingItemsSchema;
  /** Player details. */
  character: CharacterSchema;
}

/** RecyclingItemsSchema */
export interface RecyclingItemsSchema {
  /**
   * Items
   * Objects received.
   */
  items: DropSchema[];
}

/** RecyclingResponseSchema */
export interface RecyclingResponseSchema {
  data: RecyclingDataSchema;
}

/** RecyclingSchema */
export interface RecyclingSchema {
  /**
   * Item code
   * Item code.
   * @pattern ^[a-zA-Z0-9_-]+$
   */
  code: string;
  /**
   * Quantity
   * Quantity of items to recycle.
   * @min 1
   * @default 1
   */
  quantity?: number;
}

/** ResourceResponseSchema */
export interface ResourceResponseSchema {
  data: ResourceSchema;
}

/** ResourceSchema */
export interface ResourceSchema {
  /**
   * Name
   * The name of the resource
   */
  name: string;
  /**
   * Code
   * The code of the resource. This is the resource's unique identifier (ID).
   */
  code: string;
  /**
   * Skill code
   * The skill required to gather this resource.
   */
  skill: "mining" | "woodcutting" | "fishing";
  /**
   * Level
   * The skill level required to gather this resource.
   */
  level: number;
  /**
   * Drops
   * The drops of this resource.
   */
  drops: DropRateSchema[];
}

/** ResponseSchema */
export interface ResponseSchema {
  /** Message */
  message: string;
}

/** SimpleItemSchema */
export interface SimpleItemSchema {
  /**
   * Code
   * Item code.
   * @pattern ^[a-zA-Z0-9_-]+$
   */
  code: string;
  /**
   * Quantity
   * Item quantity.
   * @min 1
   */
  quantity: number;
}

/** SingleItemSchema */
export interface SingleItemSchema {
  /** Item information. */
  item: ItemSchema;
  /** Grand Exchange information. If applicable. */
  ge?: GEItemSchema | null;
}

/** SkillDataSchema */
export interface SkillDataSchema {
  /** Cooldown details. */
  cooldown: CooldownSchema;
  /** Craft details. */
  details: SkillInfoSchema;
  /** Player details. */
  character: CharacterSchema;
}

/** SkillInfoSchema */
export interface SkillInfoSchema {
  /**
   * Xp
   * The amount of xp gained.
   */
  xp: number;
  /**
   * Items
   * Objects received.
   */
  items: DropSchema[];
}

/** SkillResponseSchema */
export interface SkillResponseSchema {
  data: SkillDataSchema;
}

/** StatusResponseSchema */
export interface StatusResponseSchema {
  data: StatusSchema;
}

/** StatusSchema */
export interface StatusSchema {
  /**
   * Status
   * Server status
   */
  status: string;
  /**
   * Version
   * Game version.
   */
  version: string;
  /** Characters Online */
  characters_online?: number;
  /** Announcements */
  announcements?: AnnouncementSchema[];
  /**
   * Last Wipe
   * Last server wipe.
   */
  last_wipe: string;
  /**
   * Next Wipe
   * Next server wipe.
   */
  next_wipe: string;
}

/** TaskDataSchema */
export interface TaskDataSchema {
  /** Cooldown details. */
  cooldown: CooldownSchema;
  /** Task details. */
  task: TaskSchema;
  /** Player details. */
  character: CharacterSchema;
}

/** TaskResponseSchema */
export interface TaskResponseSchema {
  data: TaskDataSchema;
}

/** TaskRewardDataSchema */
export interface TaskRewardDataSchema {
  /** Cooldown details. */
  cooldown: CooldownSchema;
  /** Reward details. */
  reward: TaskRewardSchema;
  /** Player details. */
  character: CharacterSchema;
}

/** TaskRewardResponseSchema */
export interface TaskRewardResponseSchema {
  data: TaskRewardDataSchema;
}

/** TaskRewardSchema */
export interface TaskRewardSchema {
  /**
   * Code
   * Item code.
   */
  code: string;
  /**
   * Quantity
   * Item quantity.
   */
  quantity: number;
}

/** TaskSchema */
export interface TaskSchema {
  /**
   * Code
   * Task objective.
   */
  code: string;
  /**
   * Type
   * The type of task.
   */
  type: "monsters" | "resources" | "crafts";
  /**
   * Total
   * The total required to complete the task.
   */
  total: number;
}

/** TokenResponseSchema */
export interface TokenResponseSchema {
  /** Token */
  token: string;
}

/** UnequipSchema */
export interface UnequipSchema {
  /**
   * Slot
   * Item slot.
   */
  slot:
    | "weapon"
    | "shield"
    | "helmet"
    | "body_armor"
    | "leg_armor"
    | "boots"
    | "ring1"
    | "ring2"
    | "amulet"
    | "artifact1"
    | "artifact2"
    | "artifact3"
    | "consumable1"
    | "consumable2";
}

/** ValidationError */
export interface ValidationError {
  /** Location */
  loc: (string | number)[];
  /** Message */
  msg: string;
  /** Error Type */
  type: string;
}

export type QueryParamsType = Record<string | number, any>;
export type ResponseFormat = keyof Omit<Body, "body" | "bodyUsed">;

export interface FullRequestParams extends Omit<RequestInit, "body"> {
  /** set parameter to `true` for call `securityWorker` for this request */
  secure?: boolean;
  /** request path */
  path: string;
  /** content type of request body */
  type?: ContentType;
  /** query params */
  query?: QueryParamsType;
  /** format of response (i.e. response.json() -> format: "json") */
  format?: ResponseFormat;
  /** request body */
  body?: unknown;
  /** base url */
  baseUrl?: string;
  /** request cancellation token */
  cancelToken?: CancelToken;
}

export type RequestParams = Omit<FullRequestParams, "body" | "method" | "query" | "path">;

export interface ApiConfig<SecurityDataType = unknown> {
  baseUrl?: string;
  baseApiParams?: Omit<RequestParams, "baseUrl" | "cancelToken" | "signal">;
  securityWorker?: (securityData: SecurityDataType | null) => Promise<RequestParams | void> | RequestParams | void;
  customFetch?: typeof fetch;
}

export interface HttpResponse<D extends unknown, E extends unknown = unknown> extends Response {
  data: D;
  error: E;
}

type CancelToken = Symbol | string | number;

export enum ContentType {
  Json = "application/json",
  FormData = "multipart/form-data",
  UrlEncoded = "application/x-www-form-urlencoded",
  Text = "text/plain",
}

export class HttpClient<SecurityDataType = unknown> {
  public baseUrl: string = "";
  private securityData: SecurityDataType | null = null;
  private securityWorker?: ApiConfig<SecurityDataType>["securityWorker"];
  private abortControllers = new Map<CancelToken, AbortController>();
  private customFetch = (...fetchParams: Parameters<typeof fetch>) => fetch(...fetchParams);

  private baseApiParams: RequestParams = {
    credentials: "same-origin",
    headers: {},
    redirect: "follow",
    referrerPolicy: "no-referrer",
  };

  constructor(apiConfig: ApiConfig<SecurityDataType> = {}) {
    Object.assign(this, apiConfig);
  }

  public setSecurityData = (data: SecurityDataType | null) => {
    this.securityData = data;
  };

  protected encodeQueryParam(key: string, value: any) {
    const encodedKey = encodeURIComponent(key);
    return `${encodedKey}=${encodeURIComponent(typeof value === "number" ? value : `${value}`)}`;
  }

  protected addQueryParam(query: QueryParamsType, key: string) {
    return this.encodeQueryParam(key, query[key]);
  }

  protected addArrayQueryParam(query: QueryParamsType, key: string) {
    const value = query[key];
    return value.map((v: any) => this.encodeQueryParam(key, v)).join("&");
  }

  protected toQueryString(rawQuery?: QueryParamsType): string {
    const query = rawQuery || {};
    const keys = Object.keys(query).filter((key) => "undefined" !== typeof query[key]);
    return keys
      .map((key) => (Array.isArray(query[key]) ? this.addArrayQueryParam(query, key) : this.addQueryParam(query, key)))
      .join("&");
  }

  protected addQueryParams(rawQuery?: QueryParamsType): string {
    const queryString = this.toQueryString(rawQuery);
    return queryString ? `?${queryString}` : "";
  }

  private contentFormatters: Record<ContentType, (input: any) => any> = {
    [ContentType.Json]: (input: any) =>
      input !== null && (typeof input === "object" || typeof input === "string") ? JSON.stringify(input) : input,
    [ContentType.Text]: (input: any) => (input !== null && typeof input !== "string" ? JSON.stringify(input) : input),
    [ContentType.FormData]: (input: any) =>
      Object.keys(input || {}).reduce((formData, key) => {
        const property = input[key];
        formData.append(
          key,
          property instanceof Blob
            ? property
            : typeof property === "object" && property !== null
              ? JSON.stringify(property)
              : `${property}`,
        );
        return formData;
      }, new FormData()),
    [ContentType.UrlEncoded]: (input: any) => this.toQueryString(input),
  };

  protected mergeRequestParams(params1: RequestParams, params2?: RequestParams): RequestParams {
    return {
      ...this.baseApiParams,
      ...params1,
      ...(params2 || {}),
      headers: {
        ...(this.baseApiParams.headers || {}),
        ...(params1.headers || {}),
        ...((params2 && params2.headers) || {}),
      },
    };
  }

  protected createAbortSignal = (cancelToken: CancelToken): AbortSignal | undefined => {
    if (this.abortControllers.has(cancelToken)) {
      const abortController = this.abortControllers.get(cancelToken);
      if (abortController) {
        return abortController.signal;
      }
      return void 0;
    }

    const abortController = new AbortController();
    this.abortControllers.set(cancelToken, abortController);
    return abortController.signal;
  };

  public abortRequest = (cancelToken: CancelToken) => {
    const abortController = this.abortControllers.get(cancelToken);

    if (abortController) {
      abortController.abort();
      this.abortControllers.delete(cancelToken);
    }
  };

  public request = async <T = any, E = any>({
    body,
    secure,
    path,
    type,
    query,
    format,
    baseUrl,
    cancelToken,
    ...params
  }: FullRequestParams): Promise<HttpResponse<T, E>> => {
    const secureParams =
      ((typeof secure === "boolean" ? secure : this.baseApiParams.secure) &&
        this.securityWorker &&
        (await this.securityWorker(this.securityData))) ||
      {};
    const requestParams = this.mergeRequestParams(params, secureParams);
    const queryString = query && this.toQueryString(query);
    const payloadFormatter = this.contentFormatters[type || ContentType.Json];
    const responseFormat = format || requestParams.format;

    return this.customFetch(`${baseUrl || this.baseUrl || ""}${path}${queryString ? `?${queryString}` : ""}`, {
      ...requestParams,
      headers: {
        ...(requestParams.headers || {}),
        ...(type && type !== ContentType.FormData ? { "Content-Type": type } : {}),
      },
      signal: (cancelToken ? this.createAbortSignal(cancelToken) : requestParams.signal) || null,
      body: typeof body === "undefined" || body === null ? null : payloadFormatter(body),
    }).then(async (response) => {
      const r = response.clone() as HttpResponse<T, E>;
      r.data = null as unknown as T;
      r.error = null as unknown as E;

      const data = !responseFormat
        ? r
        : await response[responseFormat]()
            .then((data) => {
              if (r.ok) {
                r.data = data;
              } else {
                r.error = data;
              }
              return r;
            })
            .catch((e) => {
              r.error = e;
              return r;
            });

      if (cancelToken) {
        this.abortControllers.delete(cancelToken);
      }

      if (!response.ok) throw data;
      return data;
    });
  };
}

/**
 * @title Artifacts API
 * @version 1.5
 *
 *
 * Artifacts is an API-based MMO game where you can manage 5 characters to explore, fight, gather resources, craft items and much more.
 *
 * Website: https://artifactsmmo.com/
 *
 * Documentation: https://docs.artifactsmmo.com/
 *
 * OpenAPI Spec: https://api.artifactsmmo.com/openapi.json
 */
export class Api<SecurityDataType extends unknown> extends HttpClient<SecurityDataType> {
  /**
   * @description Return the status of the game server.
   *
   * @name GetStatusGet
   * @summary Get Status
   * @request GET:/
   */
  getStatusGet = (params: RequestParams = {}) =>
    this.request<StatusResponseSchema, any>({
      path: `/`,
      method: "GET",
      format: "json",
      ...params,
    });

  my = {
    /**
     * @description Moves a character on the map using the map's X and Y position.
     *
     * @tags My characters
     * @name ActionMoveMyNameActionMovePost
     * @summary Action Move
     * @request POST:/my/{name}/action/move
     * @secure
     */
    actionMoveMyNameActionMovePost: (name: string, data: DestinationSchema, params: RequestParams = {}) =>
      this.request<CharacterMovementResponseSchema, void>({
        path: `/my/${name}/action/move`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Equip an item on your character.
     *
     * @tags My characters
     * @name ActionEquipItemMyNameActionEquipPost
     * @summary Action Equip Item
     * @request POST:/my/{name}/action/equip
     * @secure
     */
    actionEquipItemMyNameActionEquipPost: (name: string, data: EquipSchema, params: RequestParams = {}) =>
      this.request<EquipmentResponseSchema, void>({
        path: `/my/${name}/action/equip`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Unequip an item on your character.
     *
     * @tags My characters
     * @name ActionUnequipItemMyNameActionUnequipPost
     * @summary Action Unequip Item
     * @request POST:/my/{name}/action/unequip
     * @secure
     */
    actionUnequipItemMyNameActionUnequipPost: (name: string, data: UnequipSchema, params: RequestParams = {}) =>
      this.request<EquipmentResponseSchema, void>({
        path: `/my/${name}/action/unequip`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Start a fight against a monster on the character's map.
     *
     * @tags My characters
     * @name ActionFightMyNameActionFightPost
     * @summary Action Fight
     * @request POST:/my/{name}/action/fight
     * @secure
     */
    actionFightMyNameActionFightPost: (name: string, params: RequestParams = {}) =>
      this.request<CharacterFightResponseSchema, void>({
        path: `/my/${name}/action/fight`,
        method: "POST",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Harvest a resource on the character's map.
     *
     * @tags My characters
     * @name ActionGatheringMyNameActionGatheringPost
     * @summary Action Gathering
     * @request POST:/my/{name}/action/gathering
     * @secure
     */
    actionGatheringMyNameActionGatheringPost: (name: string, params: RequestParams = {}) =>
      this.request<SkillResponseSchema, void>({
        path: `/my/${name}/action/gathering`,
        method: "POST",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Crafting an item. The character must be on a map with a workshop.
     *
     * @tags My characters
     * @name ActionCraftingMyNameActionCraftingPost
     * @summary Action Crafting
     * @request POST:/my/{name}/action/crafting
     * @secure
     */
    actionCraftingMyNameActionCraftingPost: (name: string, data: CraftingSchema, params: RequestParams = {}) =>
      this.request<SkillResponseSchema, void>({
        path: `/my/${name}/action/crafting`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Deposit an item in a bank on the character's map.
     *
     * @tags My characters
     * @name ActionDepositBankMyNameActionBankDepositPost
     * @summary Action Deposit Bank
     * @request POST:/my/{name}/action/bank/deposit
     * @secure
     */
    actionDepositBankMyNameActionBankDepositPost: (name: string, data: SimpleItemSchema, params: RequestParams = {}) =>
      this.request<ActionItemBankResponseSchema, void>({
        path: `/my/${name}/action/bank/deposit`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Deposit golds in a bank on the character's map.
     *
     * @tags My characters
     * @name ActionDepositBankGoldMyNameActionBankDepositGoldPost
     * @summary Action Deposit Bank Gold
     * @request POST:/my/{name}/action/bank/deposit/gold
     * @secure
     */
    actionDepositBankGoldMyNameActionBankDepositGoldPost: (
      name: string,
      data: DepositWithdrawGoldSchema,
      params: RequestParams = {},
    ) =>
      this.request<GoldResponseSchema, void>({
        path: `/my/${name}/action/bank/deposit/gold`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Recyling an item. The character must be on a map with a workshop (only for equipments and weapons).
     *
     * @tags My characters
     * @name ActionRecyclingMyNameActionRecyclingPost
     * @summary Action Recycling
     * @request POST:/my/{name}/action/recycling
     * @secure
     */
    actionRecyclingMyNameActionRecyclingPost: (name: string, data: RecyclingSchema, params: RequestParams = {}) =>
      this.request<RecyclingResponseSchema, void>({
        path: `/my/${name}/action/recycling`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Take an item from your bank and put it in the character's inventory.
     *
     * @tags My characters
     * @name ActionWithdrawBankMyNameActionBankWithdrawPost
     * @summary Action Withdraw Bank
     * @request POST:/my/{name}/action/bank/withdraw
     * @secure
     */
    actionWithdrawBankMyNameActionBankWithdrawPost: (
      name: string,
      data: SimpleItemSchema,
      params: RequestParams = {},
    ) =>
      this.request<ActionItemBankResponseSchema, void>({
        path: `/my/${name}/action/bank/withdraw`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Withdraw gold from your bank.
     *
     * @tags My characters
     * @name ActionWithdrawBankGoldMyNameActionBankWithdrawGoldPost
     * @summary Action Withdraw Bank Gold
     * @request POST:/my/{name}/action/bank/withdraw/gold
     * @secure
     */
    actionWithdrawBankGoldMyNameActionBankWithdrawGoldPost: (
      name: string,
      data: DepositWithdrawGoldSchema,
      params: RequestParams = {},
    ) =>
      this.request<GoldResponseSchema, void>({
        path: `/my/${name}/action/bank/withdraw/gold`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Buy an item at the Grand Exchange on the character's map.
     *
     * @tags My characters
     * @name ActionGeBuyItemMyNameActionGeBuyPost
     * @summary Action Ge Buy Item
     * @request POST:/my/{name}/action/ge/buy
     * @secure
     */
    actionGeBuyItemMyNameActionGeBuyPost: (name: string, data: GETransactionItemSchema, params: RequestParams = {}) =>
      this.request<GETransactionResponseSchema, void>({
        path: `/my/${name}/action/ge/buy`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Sell an item at the Grand Exchange on the character's map.
     *
     * @tags My characters
     * @name ActionGeSellItemMyNameActionGeSellPost
     * @summary Action Ge Sell Item
     * @request POST:/my/{name}/action/ge/sell
     * @secure
     */
    actionGeSellItemMyNameActionGeSellPost: (name: string, data: GETransactionItemSchema, params: RequestParams = {}) =>
      this.request<GETransactionResponseSchema, void>({
        path: `/my/${name}/action/ge/sell`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Accepting a new task.
     *
     * @tags My characters
     * @name ActionAcceptNewTaskMyNameActionTaskNewPost
     * @summary Action Accept New Task
     * @request POST:/my/{name}/action/task/new
     * @secure
     */
    actionAcceptNewTaskMyNameActionTaskNewPost: (name: string, params: RequestParams = {}) =>
      this.request<TaskResponseSchema, void>({
        path: `/my/${name}/action/task/new`,
        method: "POST",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Complete a task.
     *
     * @tags My characters
     * @name ActionCompleteTaskMyNameActionTaskCompletePost
     * @summary Action Complete Task
     * @request POST:/my/{name}/action/task/complete
     * @secure
     */
    actionCompleteTaskMyNameActionTaskCompletePost: (name: string, params: RequestParams = {}) =>
      this.request<TaskRewardResponseSchema, void>({
        path: `/my/${name}/action/task/complete`,
        method: "POST",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Exchange 3 tasks coins for a random reward. Rewards are exclusive resources for crafting  items.
     *
     * @tags My characters
     * @name ActionTaskExchangeMyNameActionTaskExchangePost
     * @summary Action Task Exchange
     * @request POST:/my/{name}/action/task/exchange
     * @secure
     */
    actionTaskExchangeMyNameActionTaskExchangePost: (name: string, params: RequestParams = {}) =>
      this.request<TaskRewardResponseSchema, void>({
        path: `/my/${name}/action/task/exchange`,
        method: "POST",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Delete an item from your character's inventory.
     *
     * @tags My characters
     * @name ActionDeleteItemMyNameActionDeletePost
     * @summary Action Delete Item
     * @request POST:/my/{name}/action/delete
     * @secure
     */
    actionDeleteItemMyNameActionDeletePost: (name: string, data: SimpleItemSchema, params: RequestParams = {}) =>
      this.request<DeleteItemResponseSchema, void>({
        path: `/my/${name}/action/delete`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description History of the last 100 actions of all your characters.
     *
     * @tags My characters
     * @name GetAllCharactersLogsMyLogsGet
     * @summary Get All Characters Logs
     * @request GET:/my/logs
     * @secure
     */
    getAllCharactersLogsMyLogsGet: (
      query?: {
        /**
         * Page
         * Page number
         * @min 1
         * @default 1
         */
        page?: number;
        /**
         * Size
         * Page size
         * @min 1
         * @max 100
         * @default 50
         */
        size?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<DataPageLogSchema, void>({
        path: `/my/logs`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description List of your characters.
     *
     * @tags My characters
     * @name GetMyCharactersMyCharactersGet
     * @summary Get My Characters
     * @request GET:/my/characters
     * @secure
     */
    getMyCharactersMyCharactersGet: (params: RequestParams = {}) =>
      this.request<MyCharactersListSchema, void>({
        path: `/my/characters`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Fetch all items in your bank.
     *
     * @tags My account
     * @name GetBankItemsMyBankItemsGet
     * @summary Get Bank Items
     * @request GET:/my/bank/items
     * @secure
     */
    getBankItemsMyBankItemsGet: (
      query?: {
        /**
         * Item code
         * Item to search in your bank.
         * @pattern ^[a-zA-Z0-9_-]+$
         */
        item_code?: string;
        /**
         * Page
         * Page number
         * @min 1
         * @default 1
         */
        page?: number;
        /**
         * Size
         * Page size
         * @min 1
         * @max 100
         * @default 50
         */
        size?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<DataPageSimpleItemSchema, void>({
        path: `/my/bank/items`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Fetch golds in your bank.
     *
     * @tags My account
     * @name GetBankGoldsMyBankGoldGet
     * @summary Get Bank Golds
     * @request GET:/my/bank/gold
     * @secure
     */
    getBankGoldsMyBankGoldGet: (params: RequestParams = {}) =>
      this.request<GoldBankResponseSchema, any>({
        path: `/my/bank/gold`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Change your account password. Changing the password reset the account token.
     *
     * @tags My account
     * @name ChangePasswordMyChangePasswordPost
     * @summary Change Password
     * @request POST:/my/change_password
     * @secure
     */
    changePasswordMyChangePasswordPost: (data: ChangePassword, params: RequestParams = {}) =>
      this.request<ResponseSchema, void>({
        path: `/my/change_password`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),
  };
  characters = {
    /**
     * @description Create new character on your account. You can create up to 5 characters.
     *
     * @tags Characters
     * @name CreateCharacterCharactersCreatePost
     * @summary Create Character
     * @request POST:/characters/create
     * @secure
     */
    createCharacterCharactersCreatePost: (data: AddCharacterSchema, params: RequestParams = {}) =>
      this.request<CharacterResponseSchema, void>({
        path: `/characters/create`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Delete character on your account.
     *
     * @tags Characters
     * @name DeleteCharacterCharactersDeletePost
     * @summary Delete Character
     * @request POST:/characters/delete
     * @secure
     */
    deleteCharacterCharactersDeletePost: (data: DeleteCharacterSchema, params: RequestParams = {}) =>
      this.request<CharacterResponseSchema, void>({
        path: `/characters/delete`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Fetch characters details.
     *
     * @tags Characters
     * @name GetAllCharactersCharactersGet
     * @summary Get All Characters
     * @request GET:/characters/
     */
    getAllCharactersCharactersGet: (
      query?: {
        /**
         * Sort
         * Default sort by combat total XP.
         */
        sort?:
          | "woodcutting"
          | "mining"
          | "fishing"
          | "weaponcrafting"
          | "gearcrafting"
          | "jewelrycrafting"
          | "cooking"
          | "gold";
        /**
         * Page
         * Page number
         * @min 1
         * @default 1
         */
        page?: number;
        /**
         * Size
         * Page size
         * @min 1
         * @max 100
         * @default 50
         */
        size?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<DataPageCharacterSchema, void>({
        path: `/characters/`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * @description Retrieve the details of a character.
     *
     * @tags Characters
     * @name GetCharacterCharactersNameGet
     * @summary Get Character
     * @request GET:/characters/{name}
     */
    getCharacterCharactersNameGet: (name: string, params: RequestParams = {}) =>
      this.request<CharacterResponseSchema, void>({
        path: `/characters/${name}`,
        method: "GET",
        format: "json",
        ...params,
      }),
  };
  maps = {
    /**
     * @description Fetch maps details.
     *
     * @tags Maps
     * @name GetAllMapsMapsGet
     * @summary Get All Maps
     * @request GET:/maps/
     */
    getAllMapsMapsGet: (
      query?: {
        /**
         * Content type
         * Type of content on the map.
         */
        content_type?: "monster" | "resource" | "workshop" | "bank" | "grand_exchange" | "tasks_master";
        /**
         * Content code
         * Content code on the map.
         * @pattern ^[a-zA-Z0-9_-]+$
         */
        content_code?: string;
        /**
         * Page
         * Page number
         * @min 1
         * @default 1
         */
        page?: number;
        /**
         * Size
         * Page size
         * @min 1
         * @max 100
         * @default 50
         */
        size?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<DataPageMapSchema, void>({
        path: `/maps/`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * @description Retrieve the details of a map.
     *
     * @tags Maps
     * @name GetMapMapsXyGet
     * @summary Get Map
     * @request GET:/maps/{x}/{y}
     */
    getMapMapsXYGet: (x: number, y: number, params: RequestParams = {}) =>
      this.request<MapResponseSchema, void>({
        path: `/maps/{x}/{y}`,
        method: "GET",
        format: "json",
        ...params,
      }),
  };
  items = {
    /**
     * @description Fetch items details.
     *
     * @tags Items
     * @name GetAllItemsItemsGet
     * @summary Get All Items
     * @request GET:/items/
     */
    getAllItemsItemsGet: (
      query?: {
        /**
         * Minimum level
         * Minimum level items.
         * @min 0
         */
        min_level?: number;
        /**
         * Maximum level
         * Maximum level items.
         * @min 0
         */
        max_level?: number;
        /**
         * Item name
         * Name of the item.
         * @pattern ^[a-zA-Z0-9_-]+$
         */
        name?: string;
        /**
         * Type
         * Type of items.
         */
        type?:
          | "consumable"
          | "body_armor"
          | "weapon"
          | "resource"
          | "leg_armor"
          | "helmet"
          | "boots"
          | "shield"
          | "amulet"
          | "ring";
        /**
         * Crafting skill
         * Skill to craft items.
         */
        craft_skill?: "weaponcrafting" | "gearcrafting" | "jewelrycrafting" | "cooking" | "woodcutting" | "mining";
        /**
         * Crafting material
         * Item code of items used as material for crafting.
         * @pattern ^[a-zA-Z0-9_-]+$
         */
        craft_material?: string;
        /**
         * Page
         * Page number
         * @min 1
         * @default 1
         */
        page?: number;
        /**
         * Size
         * Page size
         * @min 1
         * @max 100
         * @default 50
         */
        size?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<DataPageItemSchema, void>({
        path: `/items/`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * @description Retrieve the details of a item.
     *
     * @tags Items
     * @name GetItemItemsCodeGet
     * @summary Get Item
     * @request GET:/items/{code}
     */
    getItemItemsCodeGet: (code: string, params: RequestParams = {}) =>
      this.request<ItemResponseSchema, void>({
        path: `/items/${code}`,
        method: "GET",
        format: "json",
        ...params,
      }),
  };
  monsters = {
    /**
     * @description Fetch monsters details.
     *
     * @tags Monsters
     * @name GetAllMonstersMonstersGet
     * @summary Get All Monsters
     * @request GET:/monsters/
     */
    getAllMonstersMonstersGet: (
      query?: {
        /**
         * Minimum level
         * Monster minimum level.
         * @min 0
         */
        min_level?: number;
        /**
         * Maximum level
         * Monster maximum level.
         * @min 0
         */
        max_level?: number;
        /**
         * Drop
         * Item code of the drop.
         * @pattern ^[a-zA-Z0-9_-]+$
         * @example "green_slimeball"
         */
        drop?: string;
        /**
         * Page
         * Page number
         * @min 1
         * @default 1
         */
        page?: number;
        /**
         * Size
         * Page size
         * @min 1
         * @max 100
         * @default 50
         */
        size?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<DataPageMonsterSchema, void>({
        path: `/monsters/`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * @description Retrieve the details of a monster.
     *
     * @tags Monsters
     * @name GetMonsterMonstersCodeGet
     * @summary Get Monster
     * @request GET:/monsters/{code}
     */
    getMonsterMonstersCodeGet: (code: string, params: RequestParams = {}) =>
      this.request<MonsterResponseSchema, void>({
        path: `/monsters/${code}`,
        method: "GET",
        format: "json",
        ...params,
      }),
  };
  resources = {
    /**
     * @description Fetch resources details.
     *
     * @tags Resources
     * @name GetAllResourcesResourcesGet
     * @summary Get All Resources
     * @request GET:/resources/
     */
    getAllResourcesResourcesGet: (
      query?: {
        /**
         * Minimum level
         * Skill minimum level.
         * @min 0
         */
        min_level?: number;
        /**
         * Maximum level
         * Skill maximum level.
         * @min 0
         */
        max_level?: number;
        /**
         * Skill code
         * The code of the skill.
         */
        skill?: "mining" | "woodcutting" | "fishing";
        /**
         * Drop
         * Item code of the drop.
         * @pattern ^[a-zA-Z0-9_-]+$
         * @example "copper_ore"
         */
        drop?: string;
        /**
         * Page
         * Page number
         * @min 1
         * @default 1
         */
        page?: number;
        /**
         * Size
         * Page size
         * @min 1
         * @max 100
         * @default 50
         */
        size?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<DataPageResourceSchema, void>({
        path: `/resources/`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * @description Retrieve the details of a resource.
     *
     * @tags Resources
     * @name GetResourceResourcesCodeGet
     * @summary Get Resource
     * @request GET:/resources/{code}
     */
    getResourceResourcesCodeGet: (code: string, params: RequestParams = {}) =>
      this.request<ResourceResponseSchema, void>({
        path: `/resources/${code}`,
        method: "GET",
        format: "json",
        ...params,
      }),
  };
  events = {
    /**
     * @description Fetch events details.
     *
     * @tags Events
     * @name GetAllEventsEventsGet
     * @summary Get All Events
     * @request GET:/events/
     */
    getAllEventsEventsGet: (
      query?: {
        /**
         * Page
         * Page number
         * @min 1
         * @default 1
         */
        page?: number;
        /**
         * Size
         * Page size
         * @min 1
         * @max 100
         * @default 50
         */
        size?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<DataPageActiveEventSchema, void>({
        path: `/events/`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),
  };
  ge = {
    /**
     * @description Fetch Grand Exchange items details.
     *
     * @tags Grand Exchange
     * @name GetAllGeItemsGeGet
     * @summary Get All Ge Items
     * @request GET:/ge/
     */
    getAllGeItemsGeGet: (
      query?: {
        /**
         * Page
         * Page number
         * @min 1
         * @default 1
         */
        page?: number;
        /**
         * Size
         * Page size
         * @min 1
         * @max 100
         * @default 50
         */
        size?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<DataPageGEItemSchema, void>({
        path: `/ge/`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * @description Retrieve the details of a Grand Exchange item.
     *
     * @tags Grand Exchange
     * @name GetGeItemGeCodeGet
     * @summary Get Ge Item
     * @request GET:/ge/{code}
     */
    getGeItemGeCodeGet: (code: string, params: RequestParams = {}) =>
      this.request<GEItemResponseSchema, void>({
        path: `/ge/${code}`,
        method: "GET",
        format: "json",
        ...params,
      }),
  };
  accounts = {
    /**
     * @description Create an account.
     *
     * @tags Accounts
     * @name CreateAccountAccountsCreatePost
     * @summary Create Account
     * @request POST:/accounts/create
     */
    createAccountAccountsCreatePost: (data: AddAccountSchema, params: RequestParams = {}) =>
      this.request<ResponseSchema, void>({
        path: `/accounts/create`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),
  };
  token = {
    /**
     * @description Use your account as HTTPBasic Auth to generate your token to use the API. You can also generate your token directly on the website.
     *
     * @tags Token
     * @name GenerateTokenTokenPost
     * @summary Generate Token
     * @request POST:/token/
     * @secure
     */
    generateTokenTokenPost: (params: RequestParams = {}) =>
      this.request<TokenResponseSchema, void>({
        path: `/token/`,
        method: "POST",
        secure: true,
        format: "json",
        ...params,
      }),
  };
}
