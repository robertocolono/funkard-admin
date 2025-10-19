"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { ScrollArea } from "@/components/ui/scroll-area"

interface VirtualListProps<T> {
  items: T[]
  itemHeight: number
  containerHeight: number
  renderItem: (item: T, index: number) => React.ReactNode
  className?: string
  overscan?: number
  onScroll?: (scrollTop: number) => void
}

export function VirtualList<T>({
  items,
  itemHeight,
  containerHeight,
  renderItem,
  className,
  overscan = 5,
  onScroll
}: VirtualListProps<T>) {
  const [scrollTop, setScrollTop] = React.useState(0)
  const scrollAreaRef = React.useRef<HTMLDivElement>(null)

  const handleScroll = React.useCallback((event: React.UIEvent<HTMLDivElement>) => {
    const target = event.target as HTMLDivElement
    const newScrollTop = target.scrollTop
    setScrollTop(newScrollTop)
    onScroll?.(newScrollTop)
  }, [onScroll])

  const startIndex = Math.floor(scrollTop / itemHeight)
  const endIndex = Math.min(
    startIndex + Math.ceil(containerHeight / itemHeight) + overscan,
    items.length - 1
  )

  const visibleItems = items.slice(startIndex, endIndex + 1)
  const totalHeight = items.length * itemHeight
  const offsetY = startIndex * itemHeight

  return (
    <ScrollArea
      ref={scrollAreaRef}
      className={cn("w-full", className)}
      style={{ height: containerHeight }}
      onScroll={handleScroll}
    >
      <div style={{ height: totalHeight, position: "relative" }}>
        <div
          style={{
            transform: `translateY(${offsetY}px)`,
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
          }}
        >
          {visibleItems.map((item, index) => (
            <div
              key={startIndex + index}
              style={{ height: itemHeight }}
              className="flex items-center"
            >
              {renderItem(item, startIndex + index)}
            </div>
          ))}
        </div>
      </div>
    </ScrollArea>
  )
}

// Componente per lista virtuale con ricerca
interface SearchableVirtualListProps<T> {
  items: T[]
  itemHeight: number
  containerHeight: number
  renderItem: (item: T, index: number) => React.ReactNode
  searchFields: (keyof T)[]
  placeholder?: string
  className?: string
  overscan?: number
  onScroll?: (scrollTop: number) => void
}

export function SearchableVirtualList<T>({
  items,
  itemHeight,
  containerHeight,
  renderItem,
  searchFields,
  placeholder = "Cerca...",
  className,
  overscan = 5,
  onScroll
}: SearchableVirtualListProps<T>) {
  const [searchTerm, setSearchTerm] = React.useState("")
  const [filteredItems, setFilteredItems] = React.useState(items)

  React.useEffect(() => {
    if (!searchTerm) {
      setFilteredItems(items)
      return
    }

    const filtered = items.filter((item) =>
      searchFields.some((field) => {
        const value = item[field]
        return value && String(value).toLowerCase().includes(searchTerm.toLowerCase())
      })
    )
    setFilteredItems(filtered)
  }, [items, searchTerm, searchFields])

  return (
    <div className={cn("space-y-4", className)}>
      <input
        type="text"
        placeholder={placeholder}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
      />
      <VirtualList
        items={filteredItems}
        itemHeight={itemHeight}
        containerHeight={containerHeight}
        renderItem={renderItem}
        overscan={overscan}
        onScroll={onScroll}
      />
    </div>
  )
}

// Componente per lista virtuale con selezione
interface SelectableVirtualListProps<T> {
  items: T[]
  itemHeight: number
  containerHeight: number
  renderItem: (item: T, index: number, isSelected: boolean) => React.ReactNode
  selectedItems: T[]
  onSelectionChange: (selectedItems: T[]) => void
  className?: string
  overscan?: number
  onScroll?: (scrollTop: number) => void
}

export function SelectableVirtualList<T>({
  items,
  itemHeight,
  containerHeight,
  renderItem,
  selectedItems,
  onSelectionChange,
  className,
  overscan = 5,
  onScroll
}: SelectableVirtualListProps<T>) {
  const handleItemClick = React.useCallback((item: T) => {
    const isSelected = selectedItems.includes(item)
    if (isSelected) {
      onSelectionChange(selectedItems.filter((selected) => selected !== item))
    } else {
      onSelectionChange([...selectedItems, item])
    }
  }, [selectedItems, onSelectionChange])

  const renderItemWithSelection = React.useCallback((item: T, index: number) => {
    const isSelected = selectedItems.includes(item)
    return (
      <div
        onClick={() => handleItemClick(item)}
        className={cn(
          "cursor-pointer transition-colors",
          isSelected && "bg-accent text-accent-foreground"
        )}
      >
        {renderItem(item, index, isSelected)}
      </div>
    )
  }, [selectedItems, handleItemClick, renderItem])

  return (
    <VirtualList
      items={items}
      itemHeight={itemHeight}
      containerHeight={containerHeight}
      renderItem={renderItemWithSelection}
      className={className}
      overscan={overscan}
      onScroll={onScroll}
    />
  )
}